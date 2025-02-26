console.info("[SOCIETY] addBonemeal.js loaded");

const bonemealThrottle = ((temp) => (entity, tick, identifier) => {
  const { age, uuid } = entity;
  const key = `${uuid}${identifier}`;
  const now = temp[key];
  if (!now || age - now >= tick) {
    temp[key] = age;
    return false;
  }
  return true;
})({});

BlockEvents.rightClicked(
  ["meadow:eriophorum_tall", "meadow:small_fir"],
  (e) => {
    if (
      e.player.getHeldItem("main_hand") == "minecraft:bone_meal" &&
      bonemealThrottle(e.player, 2, "bonemeal_throttle")
    ) {
      e.block.canSeeSky
      e.player.getHeldItem("main_hand").count--;
      let crop = e.block.level.createEntity("minecraft:item");
      crop.x = e.block.x + Math.floor(Math.random() * 1.5) + 0.5;
      crop.y = e.block.y + 0.5;
      crop.z = e.block.z + Math.floor(Math.random() * 1.5) + 0.5;
      crop.item = Item.of(e.block.id);
      crop.spawn();
      e.block.level.spawnParticles(
        "minecraft:happy_villager",
        true,
        e.block.x + 0.5,
        e.block.y + 0.1,
        e.block.z + 0.5,
        0.1 * rnd(1, 4),
        0.1 * rnd(1, 4),
        0.1 * rnd(1, 4),
        10,
        0.1
      );
      e.server.runCommandSilent(
        `playsound minecraft:item.bone_meal.use block @a ${e.player.x} ${e.player.y} ${e.player.z}`
      );
    }
  }
);
