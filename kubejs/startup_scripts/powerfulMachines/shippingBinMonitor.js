// priority: 1
console.info("[SOCIETY] shippingBinMonitor.js loaded");

global.runShippingBinMonitor = (entity) => {
  const { level, block } = entity;
  const belowPos = block.getPos().below();
  const belowBlock = level.getBlock(belowPos.x, belowPos.y, belowPos.z);
  if (belowBlock.hasTag("society:shipping_bin")) {
    let owner = belowBlock.getEntityData().data.owner;
    let slots = belowBlock.inventory.getSlots();
    let playerAttributes;
    let binPlayer;
    let binPlayerUUID;
    let calculationResults;

    level.getServer().players.forEach((p) => {
      if (p.getUuid().toString() === owner) {
        playerAttributes = p.nbt.Attributes;
        binPlayer = p;
        binPlayerUUID = binPlayer.getUuid().toString();
      }
    });
    if (playerAttributes) {
      calculationResults = Math.round(
        global.processShippingBinInventory(
          belowBlock.inventory,
          slots,
          playerAttributes,
          binPlayer.stages,
          false,
          true
        ).calculatedValue
      );
      let nbt = entity.block.getEntityData();
      if (nbt.data.value !== calculationResults) {
        nbt.merge({ data: { value: calculationResults } });
        block.setEntityData(nbt);
        global.clearOldTextDisplay(block, "shipping_bin_monitor");
        global.spawnTextDisplay(
          block,
          block.y + 0.25,
          "shipping_bin_monitor",
          `● ${global.formatPrice(calculationResults)}`
        );
      }
    }
  }
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:shipping_bin_monitor", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .defaultCutout()
    .box(0, 0, 0, 16, 3, 16)
    .item((item) => {
      item.tooltip(Text.gray("Displays coin value of Shipping Bin below"));
      item.modelJson({
        parent: "society:block/shipping_bin_monitor",
      });
    })
    .model("society:block/shipping_bin_monitor")
    .blockEntity((blockInfo) => {
      blockInfo.initialData({ value: 0 });
      blockInfo.serverTick(600, 0, (entity) => global.runShippingBinMonitor(entity));
    });
});
