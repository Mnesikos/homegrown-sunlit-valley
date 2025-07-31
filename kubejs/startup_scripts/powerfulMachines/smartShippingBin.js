// priority: 1
console.info("[SOCIETY] smartShippingBin.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("shippingbin:smart_shipping_bin", "cardinal")
    .tagBlock("minecraft:mineable/axe")
    .item((item) => {
      item.tooltip(Text.gray("Sells inventory periodically and spits it out into the world"));
      item.tooltip(Text.green("Automatically converts coins into highest denominations"));
      item.modelJson({
        parent: "society:block/smart_shipping_bin",
      });
    })
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 6);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(4000, 0, (entity) => {
        const { inventory, block } = entity;
        let slots = entity.inventory.getSlots();
        let value = 0;
        let playerAttributes;
        let binPlayer;
        entity.level.getServer().players.forEach((p) => {
          if (p.getUuid().toString() === block.getEntityData().data.owner) {
            playerAttributes = p.nbt.Attributes;
            binPlayer = p;
          }
        });
        if (playerAttributes) {
          value = global.processShippingBinInventory(
            inventory,
            slots,
            playerAttributes,
            binPlayer.stages
          ).calculatedValue;
          global.processValueOutput(
            value,
            slots,
            undefined,
            binPlayer,
            binPlayer.server,
            block,
            inventory,
            true
          );
        }
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) => blockEntity.inventory.getSlotLimit(slot))
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) => blockEntity.inventory.getStackInSlot(slot))
      );
    }).blockstateJson = {
    multipart: [
      {
        when: { facing: "north" },
        apply: {
          model: "society:block/smart_shipping_bin",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { facing: "east" },
        apply: {
          model: "society:block/smart_shipping_bin",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { facing: "south" },
        apply: {
          model: "society:block/smart_shipping_bin",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { facing: "west" },
        apply: {
          model: "society:block/smart_shipping_bin",
          y: -90,
          uvlock: false,
        },
      },
    ],
  };
});
