console.info("[SOCIETY] artisanHopper.js loaded");

global.getArtisanMachineData = (block) => {
  let machineData = {
    recipes: [],
    stageCount: 0,
    multipleInputs: false,
    hasTag: false,
    outputMult: undefined,
  };
  let id = block.id;
  const upgraded = block.properties.get("upgraded");
  switch (id) {
    case "society:loom":
      machineData = {
        recipes: global.loomRecipes,
        stageCount: 5,
        multipleInputs: true,
        hasTag: true,
      };
      break;
    case "society:mayonnaise_machine":
      machineData = { recipes: global.mayonnaiseMachineRecipes, stageCount: 3 };
      break;
    case "society:preserves_jar":
      machineData = {
        recipes: global.preservesJarRecipes,
        stageCount: upgraded ? 3 : 5,
        multipleInputs: true,
      };
      break;
    case "society:crystalarium":
      machineData = { recipes: global.crystalariumCrystals, stageCount: 5 };
      break;
    case "society:aging_cask":
      machineData = { recipes: global.agingCaskRecipes, stageCount: 10 };
      break;
    case "society:ancient_cask":
      if (upgraded) {
        machineData = {
          recipes: global.ancientCaskRecipes,
          stageCount: 4,
          multipleInputs: true,
          hasTag: false,
          outputMult: 4,
        };
      } else {
        machineData = { recipes: global.ancientCaskRecipes, stageCount: 20 };
      }
      break;
    case "society:dehydrator":
      machineData = { recipes: global.dehydratorRecipes, stageCount: 8, multipleInputs: true };
      break;
    case "society:deluxe_worm_farm":
      machineData = { recipes: global.deluxeWormFarmRecipes, stageCount: 4, multipleInputs: true };
      break;
    case "society:seed_maker":
      machineData = { recipes: global.seedMakerRecipes, stageCount: 3, multipleInputs: true };
      break;
    case "society:fish_smoker":
      machineData = { recipes: global.fishSmokerRecipes, stageCount: 5 };
      break;
    case "society:bait_maker":
      machineData = { recipes: global.baitMakerRecipes, stageCount: 1 };
      break;
    case "society:recycling_machine":
      machineData = { recipes: global.recyclingMachineRecipes, stageCount: 1 };
      break;
    case "society:tapper":
      machineData = { recipes: global.tapperRecipes, stageCount: 1 };
      break;
    case "society:charging_rod":
      machineData = { recipes: null, stageCount: 5 };
      break;
    default:
      console.log("Invalid artisan machine!");
  }
  return machineData;
};
global.runArtisanHopper = (tickEvent, artisanMachine, player, delay) => {
  console.log("running");
  const { level, block, inventory } = tickEvent;
  const { x, y, z } = artisanMachine;
  const machineData = global.getArtisanMachineData(artisanMachine);
  let machineOutput;
  let newProperties = artisanMachine.getProperties();
  console.log(newProperties);
  if (
    newProperties.get("mature").toLowerCase() === "true" &&
    global.useInventoryItems(inventory, "society:sparkstone", 1) == 1
  ) {
    level.server.runCommandSilent(`playsound twigs:block.shroomlamp.place block @a ${x} ${y} ${z}`);
    machineOutput = global.artisanHarvest(
      artisanMachine,
      newProperties,
      machineData.recipes,
      machineData.stageCount,
      machineData.outputMult,
      true
    );
    if (machineOutput) {
      let specialItemResultCode = global.insertBelow(level, block, machineOutput);
      if (specialItemResultCode == 1) {
        level.spawnParticles(
          "species:ascending_dust",
          true,
          x,
          y + 1,
          z,
          0.2 * rnd(1, 1.5),
          0.2 * rnd(1, 1.5),
          0.2 * rnd(1, 1.5),
          3,
          0.01
        );
      }
    }
  }
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:artisan_hopper", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Inserts items into Artisan Machines from inventory above."));
      item.tooltip(Text.gray("Harvests outputs from Artisan Machines into inventory below."));
      item.tooltip(Text.gray("Uses the skills of player that places it."));
      item.tooltip(Text.green(`Area: 7x7`));
      item.tooltip(Text.lightPurple("Requires Sparkstone"));
      item.modelJson({
        parent: "society:block/artisan_hopper",
      });
    })
    .soundType("copper")
    .model("society:block/artisan_hopper")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 2);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(200, 0, (entity) => {
        const { block, level } = entity;
        const { x, y, z } = block;
        const radius = 3;
        let attachedPlayer;
        level.players.forEach((p) => {
          if (p.getUuid().toString() === block.getEntityData().data.owner) {
            attachedPlayer = p;
          }
        });
        if (attachedPlayer) {
          let scanBlock;
          let scannedBlocks = 0;
          for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), [
            x + radius,
            y + radius,
            z + radius,
          ])) {
            scanBlock = level.getBlock(pos);
            if (scanBlock.hasTag("society:artisan_machine")) {
              global.runArtisanHopper(entity, scanBlock, attachedPlayer, scannedBlocks * 5);
              scannedBlocks++;
            }
          }
        }
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .extractItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.extractItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) => blockEntity.inventory.getSlotLimit(slot))
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) => blockEntity.inventory.getStackInSlot(slot))
      );
    });
});
