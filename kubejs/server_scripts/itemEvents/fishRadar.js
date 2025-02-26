console.info("[SOCIETY] fishRadar.js loaded");

const renderItem = (id) => Item.of(id).displayName;

const validateEntry = (entry, isDay, level, fishArray) => {
  if (entry.requiresRain && !level.raining) return;
  if (entry.requiresClear && (level.raining || level.thundering)) return;
  if (isDay && entry.night) return;
  if (!isDay && entry.night == undefined) return;
  fishArray.push(renderItem(entry.fish));
};

const overworldRadar = (e, fish) => {
  let local = fish;
  const { level, player } = e;
  const season = global.getSeasonFromLevel(level);
  const biomeTags = level.getBiome(player.pos).tags().toList().toString();
  const isDay = level.getDayTime() % 24000 < 12999;
  let weather = level.raining ? ":rain_cloud: §9Rain§r" : ":sunny: §eClear§r";
  let time = isDay ? ":sunrise: §6Day§r" : ":moon: §8Night§r";
  if (
    biomeTags.includes("minecraft:is_ocean") ||
    biomeTags.includes("minecraft:is_beach")
  ) {
    player.tell(`    :ocean: §3Ocean§r ${weather} ${time}`);
    switch (season) {
      case "spring":
        global.springOcean.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "summer":
        global.summerOcean.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "autumn":
        global.autumnOcean.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "winter":
        global.winterOcean.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
    }
  } else if (biomeTags.includes("minecraft:is_river")) {
    player.tell(`    :droplet: §9River§r ${weather} ${time}`);
    switch (season) {
      case "spring":
        global.springRiver.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "summer":
        global.summerRiver.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "autumn":
        global.autumnRiver.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "winter":
        global.winterRiver.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
    }
  } else {
    player.tell(`:bubbles: §bFreshwater§r ${weather} ${time}`);
    switch (season) {
      case "spring":
        global.springFresh.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "summer":
        global.summerFresh.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "autumn":
        global.autumnFresh.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
      case "winter":
        global.winterFresh.forEach((fish) =>
          validateEntry(fish, isDay, level, local)
        );
        break;
    }
  }
  return local;
};
const netherRadar = (e, local) => {
  let defaultFish = [
    renderItem("netherdepthsupgrade:searing_cod"),
    renderItem("netherdepthsupgrade:lava_pufferfish"),
    renderItem("netherdepthsupgrade:blazefish"),
    renderItem("netherdepthsupgrade:fortress_grouper"),
  ];
  let netherFish = local.concat(defaultFish);
  const { level, player } = e;
  let biome = level.getBiome(player.pos).toString();

  if (biome.includes("minecraft:nether_wastes")) {
    player.tell(`            §4Nether Wastes`);
    netherFish.push(renderItem("netherdepthsupgrade:bonefish"));
  } else if (biome.includes("minecraft:soul_sand_valley")) {
    player.tell(`          §4Soul Sand Valley`);
    netherFish.push(renderItem("netherdepthsupgrade:wither_bonefish"));
    netherFish.push(renderItem("netherdepthsupgrade:soulsucker"));
  } else if (biome.includes("minecraft:basalt_deltas")) {
    player.tell(`            §4Basalt Deltas`);
    netherFish.push(renderItem("netherdepthsupgrade:magmacubefish"));
  } else if (biome.includes("minecraft:crimson_forest")) {
    player.tell(`            §4Crimson Forest`);
    netherFish.push(renderItem("netherdepthsupgrade:eyeball_fish"));
  } else if (biome.includes("minecraft:warped_forest")) {
    player.tell(`            §4Warped Forest`);
    netherFish.push(renderItem("netherdepthsupgrade:glowdine"));
  } else {
    player.tell(`            §4The Nether`);
  }
  return netherFish;
};
ItemEvents.rightClicked("society:fish_radar", (e) => {
  const { level, player, item } = e;

  let fish = [];
  player.tell(Text.gray("========[ §aFish Radar§7 ]========"));

  if (level.dimension !== "minecraft:the_nether") {
    fish = overworldRadar(e, fish);
  } else {
    fish = netherRadar(e, fish);
  }
  level.getBiome(player.pos).get();
  if (player.stages.has("mystical_ocean"))
    fish.push(renderItem("society:neptuna"));

  player.tell(Text.gray("============================"));
  fish.forEach((fish) => {
    player.tell(fish);
  });
  player.addItemCooldown(item, 20);
});
