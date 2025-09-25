console.info("[SOCIETY] ribbitHut.js loaded");

const Block = Java.loadClass("net.minecraft.world.level.block.Block");

global.runRibbitHut = (tickEvent) => {
  const { level, block, inventory } = tickEvent;
  let centerBlock = global.getOpposite(block.getProperties().get("facing"), block.getPos());
  const { x, y, z } = centerBlock;
  const server = level.server;
  let attachedPlayer;
  let dayTime = level.dayTime();
  let morningModulo = dayTime % 24000;
  const goldenClockProgTime = 2000;
  let scannedBlock;
  let blockState;
  let scannedMCBlock;
  let drops;
  let quality;
  if (
    morningModulo >= goldenClockProgTime &&
    morningModulo < goldenClockProgTime + artMachineTickRate
  ) {
    level.getServer().players.forEach((p) => {
      if (p.getUuid().toString() === block.getEntityData().data.owner) {
        attachedPlayer = p;
      }
    });
    if (attachedPlayer) {
      for (let pos of BlockPos.betweenClosed(new BlockPos(x - 6, y - 1, z - 6), [
        x + 6,
        y + 1,
        z + 6,
      ])) {
        scannedBlock = level.getBlock(pos);
        level.spawnParticles(
          "ribbits:spell",
          true,
          pos.x + 0.5,
          pos.y + 0.5,
          pos.z + 0.5,
          0,
          0,
          0,
          0,
          0.0001
        );
        if (scannedBlock.hasTag("minecraft:crops")) {
          blockState = level.getBlockState(pos);
          scannedMCBlock = blockState.block;
          if (scannedMCBlock.isMaxAge(blockState)) {
            drops = Block.getDrops(blockState, level, pos, null, null, Item.of("minecraft:hoe"));
            drops.forEach((drop) => {
              quality = global.getCropQuality(scannedBlock);
              // 4.0 TODO: remove effects:[] from this data
              if (quality > 0) {
                drop.nbt = `{quality_food:{effects:[],quality:${quality}}}`;
              }
              if (global.inventoryHasRoom(block, drop)) {
                global.insertInto(block, drop);
              }
            });
            scannedBlock.set(scannedBlock.id, { age: "0" });
          }
        }
      }
    }
  }
};

StartupEvents.registry("block", (e) => {
  e.create("society:ribbit_hut", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .soundType("shroomlight")
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Creates a hut in a 3x3x3 space centered around it."));
      item.tooltip(Text.gray("Ribbits will collect crops at 8am every morning."));
      item.tooltip(Text.gray("Uses the skills of player that places it."));
      item.tooltip(Text.green(`Area: 19x3x19`));
      item.modelJson({
        parent: "society:item/ribbit_hut_item ",
      });
    })
    .lightLevel(1)
    .property(booleanProperty.create("upgraded"))
    .defaultState((state) => {
      state.set(booleanProperty.create("upgraded"), false);
    })
    .placementState((state) => {
      state.set(booleanProperty.create("upgraded"), false);
    })
    .soundType("stone")
    .model("society:block/ribbit_hut/bottom_front_center")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 2);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(artMachineTickRate, 0, (entity) => {
        global.runRibbitHut(entity);
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .extractItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.extractItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) => blockEntity.inventory.getSlotLimit(slot))
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) => blockEntity.inventory.getStackInSlot(slot))
      );
    });
  e.create("society:ribbit_hut_block", "cardinal")
    .property(integerProperty.create("layer", 0, 2))
    .property(integerProperty.create("depth", 0, 2))
    .property(integerProperty.create("side", 0, 2))
    .defaultState((state) => {
      state.set(integerProperty.create("layer", 0, 2), 0);
      state.set(integerProperty.create("depth", 0, 2), 0);
      state.set(integerProperty.create("side", 0, 2), 1);
    })
    .placementState((state) => {
      state.set(integerProperty.create("layer", 0, 2), 0);
      state.set(integerProperty.create("depth", 0, 2), 0);
      state.set(integerProperty.create("side", 0, 2), 1);
    })
    .resistance(3600000)
    .unbreakable()
    .item((item) => {
      item.modelJson({
        parent: "ribbits:item/toadstool",
      });
    })
    .tagBlock("minecraft:mineable/axe")
    .tagBlock("minecraft:needs_stone_tool")
    .defaultCutout()
    .soundType("stone");
});
