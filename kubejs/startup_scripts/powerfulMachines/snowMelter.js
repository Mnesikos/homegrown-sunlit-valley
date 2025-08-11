console.info("[SOCIETY] snowMelter.js loaded");

global.handleSnowMelter = (entity) => {
  const { block, level } = entity;
  const { x, y, z } = block;
  const radius = 10;
  const verticalRadius = 2;
  let scanBlock;
  for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - verticalRadius, z - radius), [
    x + radius,
    y + verticalRadius,
    z + radius,
  ])) {
    scanBlock = level.getBlock(pos);
    if (scanBlock.id === "minecraft:snow") {
      scanBlock.set("minecraft:air");
    }
    if (scanBlock.id === "snowrealmagic:snow") {
      scanBlock.set("minecraft:grass", 1);
    }
  }
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:snow_melter", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Removes snow layers from area"));
      item.tooltip(Text.green(`Area: 19x5x19`));
      item.modelJson({
        parent: "society:block/quality_washer",
      });
    })
    .model("society:block/quality_washer")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 1);
      blockInfo.serverTick(20, 0, (entity) => {
        global.handleSnowMelter(entity);
      })
    });
});
