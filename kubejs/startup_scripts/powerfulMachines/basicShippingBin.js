// priority: 1
console.info("[SOCIETY] basicShippingBin.js loaded");

const debug = false;

const basicCoinMap = [
  { coin: "numismatics:sun", value: 4096 },
  { coin: "numismatics:crown", value: 512 },
  { coin: "numismatics:cog", value: 64 },
  { coin: "numismatics:sprocket", value: 16 },
  { coin: "numismatics:bevel", value: 8 },
  { coin: "numismatics:spur", value: 1 },
];

const calculateSlotsNeeded = (coins) => {
  let slots = 0;
  coins.forEach((coinObj) => {
    let { count } = coinObj;
    for (let index = 0; index <= count; index += 64) {
      slots++;
    }
  });
  return slots;
};

StartupEvents.registry("block", (event) => {
  event
    .create("shippingbin:basic_shipping_bin", "cardinal")
    .tagBlock("minecraft:mineable/axe")
    .item((item) => {
      item.tooltip(Text.gray("Sells items every morning and leaves coins in its inventory"));
      item.modelJson({
        parent: "shippingbin:block/shipping_bin",
      });
    })
    .model("shippingbin:block/shipping_bin")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 4);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(10, 0, (entity) => {
        const { inventory, level, block } = entity;
        let dayTime = level.dayTime();
        let morningModulo = dayTime % 24000;
        if (morningModulo >= 5 && morningModulo < 15) {
          let slots = inventory.getSlots();
          let value = 0;
          let playerAttributes;
          let binPlayer;
          let removedSlots = [];
          let calculationResults;
          level.getServer().players.forEach((p) => {
            if (p.getUuid().toString() === block.getEntityData().data.owner) {
              playerAttributes = p.nbt.Attributes;
              binPlayer = p;
            }
          });
          if (playerAttributes) {
            calculationResults = global.processShippingBinInventory(
              inventory,
              slots,
              playerAttributes,
              binPlayer.stages,
              true
            );
            value = Math.round(calculationResults.calculatedValue);
            removedSlots = calculationResults.removedItems;
            global.processValueOutput(
              value,
              slots,
              removedSlots,
              binPlayer,
              binPlayer.server,
              block,
              inventory
            );
          }
        }
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
});
