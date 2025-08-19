console.info("[SOCIETY] bankerBroken.js loaded");

BlockEvents.broken("numismatics:blaze_banker", (e) => {
  e.player.tell(Text.red("If block doesn't break, right click with a pickaxe."))
  e.level.destroyBlock(e.block.pos, true);
});

BlockEvents.rightClicked("numismatics:blaze_banker", (e) => {
  const { item,block, level } = e;
  if (item.hasTag("minecraft:pickaxes")) level.destroyBlock(block.pos, true);
});

BlockEvents.rightClicked("create_central_kitchen:blaze_stove", (e) => {
  if (e.item.id === 'create_central_kitchen:cooking_guide') e.cancel()
});