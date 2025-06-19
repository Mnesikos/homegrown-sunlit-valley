console.info("[SOCIETY] replaceDeprecation.js loaded");

BlockEvents.rightClicked("treetap:tap", (e) => {
  const { block, level } = e;
  const tapperLog = global.getTapperLog(level, block);
  block.set("minecraft:air");
  block.popItem(Item.of("society:tapper"))
  global.tapperRecipes.forEach((recipe) => {
    if (recipe.input === tapperLog.id) block.popItem(Item.of(recipe.output[0]));
  });
});

BlockEvents.rightClicked(["treetap:wooden_sap_collector", "treetap:sap_collector"], (e) => {
  const { block, level } = e;
  const tapperLog = global.getTapperLog(level, block);
  const aboveBlock = level.getBlock(block.getPos().above());
  aboveBlock.set("minecraft:air");
  block.set("minecraft:air");
  block.popItem(Item.of("society:tapper"))
  global.tapperRecipes.forEach((recipe) => {
    if (recipe.input == tapperLog.id) block.popItem(Item.of(recipe.output));
  });
});

BlockEvents.rightClicked("mining_dimension:teleporter", (e) => {
  const { block, player } = e;
  block.set("society:skull_cavern_teleporter");
  player.tell(
    Text.red(
      "The Skull Cavern you are about to enter is a bit different than what you may be used to..."
    )
  );
  e.cancel();
});
