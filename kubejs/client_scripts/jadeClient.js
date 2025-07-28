const $BLOCK = Java.loadClass("net.minecraft.world.level.block.Block");
const integerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
);
global["JadeBlocksClientCallback"] = (tooltip, accessor, pluginConfig) => {
  if (!global.plushies.includes(accessor.getBlock().id)) return;
  const properties = accessor.getBlockState();
  const type = properties.getValue(
    integerProperty.create("type", 0, global.originalPlushies.length)
  );
  let typeData = global.plushieTraits[type];
  const quality = properties.getValue(integerProperty.create("quality", 0, 4));
  const affection = properties.getValue(integerProperty.create("affection", 0, 4));
  let blockName = accessor.getBlock().getDescriptionId();
  tooltip.clear();
  tooltip.add(Component.translatable(blockName));
  tooltip.add(`§6${"★".repeat(quality + 1)}§8${"☆".repeat(3 - quality)}`);
  tooltip.add(`§${typeData.color}${global.formatName(typeData.trait)}`);
  tooltip.add(
    `§c${affection > 0 ? `❤`.repeat(affection) : ""}§8${
      affection < 4 ? `❤`.repeat(4 - affection) : ""
    }`
  );
};

JadeEvents.onClientRegistration((e) => {
  e.block("society:plushie_jade", $BLOCK).tooltip((tooltip, accessor, pluginConfig) => {
    global["JadeBlocksClientCallback"](tooltip, accessor, pluginConfig);
  });
});
