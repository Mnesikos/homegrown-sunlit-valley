const $Block = Java.loadClass("net.minecraft.world.level.block.Block");
const $IntegerProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.IntegerProperty"
);
const $BooleanProperty = Java.loadClass(
  "net.minecraft.world.level.block.state.properties.BooleanProperty"
);
const Vec2 = Java.loadClass("net.minecraft.world.phys.Vec2");

global["JadePlushieClientCallback"] = (tooltip, accessor, pluginConfig) => {
  if (!global.plushies.includes(accessor.getBlock().id)) return;
  const properties = accessor.getBlockState();
  const type = properties.getValue($IntegerProperty.create("type", 0, global.plushieTraits.length));
  let typeData = global.plushieTraits[type];
  const quality = properties.getValue($IntegerProperty.create("quality", 0, 4));
  const affection = properties.getValue($IntegerProperty.create("affection", 0, 4));
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
global["JadeFishPondClientCallback"] = (tooltip, accessor, pluginConfig) => {
  if (accessor.getBlock().id !== "society:fish_pond") return;
  const properties = accessor.getBlockState();
  const type = properties.getValue(
    $IntegerProperty.create("type", 0, global.fishPondDefinitions.length)
  );
  if (Number(type) === 0) return;
  let fish = global.fishPondDefinitions[Number(type) - 1].item;
  const population = properties.getValue($IntegerProperty.create("population", 0, 10));
  const maxPopulation = properties.getValue($IntegerProperty.create("max_population", 0, 10));
  const upgraded = properties.getValue($BooleanProperty.create("upgraded"));
  let fishIcons = "";

  for (let index = 0; index < maxPopulation; index++) {
    if (index < population) fishIcons += "§3🐟§r";
    else fishIcons += "§7🐟§r";
  }
  let blockName = accessor.getBlock().getDescriptionId();
  tooltip.clear();
  const helper = tooltip.getElementHelper();
  const fishIcon = helper.item(Item.of(fish), 0.5).message(null).translate(Vec2(-2, -1));
  tooltip.add(Component.translatable(blockName));
  tooltip["add(snownee.jade.api.ui.IElement)"](fishIcon);
  tooltip.append(Component.translatable(Item.of(fish).getDescriptionId()));
  if (upgraded) {
    const upgrade = helper
      .item(Item.of("society:sea_biscut"), 0.5)
      .message(null)
      .translate(Vec2(-2, -1));
    tooltip["add(snownee.jade.api.ui.IElement)"](upgrade);
    tooltip.append(fishIcons);
  } else {
    tooltip.add(fishIcons);
  }
};

JadeEvents.onClientRegistration((e) => {
  e.block("society:plushie_jade", $Block).tooltip((tooltip, accessor, pluginConfig) => {
    global["JadePlushieClientCallback"](tooltip, accessor, pluginConfig);
  });
  e.block("society:fish_pond_jade", $Block).tooltip((tooltip, accessor, pluginConfig) => {
    global["JadeFishPondClientCallback"](tooltip, accessor, pluginConfig);
  });
});
