EntityEvents.hurt((e) => {
  const { server, level, entity } = e;
  if (entity.isPlayer() && Math.random() < 0.2 && entity.stages.has("steadfast")) {
    entity.heal(2);
    level.spawnParticles(
      "minecraft:heart",
      true,
      entity.x,
      entity.y + 1.5,
      entity.z,
      0.1 * rnd(1, 4),
      0.1 * rnd(1, 4),
      0.1 * rnd(1, 4),
      5,
      0.01
    );
    server.runCommandSilent(
      `playsound species:item.wicked_treat.apply block @a ${entity.x} ${entity.y} ${entity.z}`
    );
  }
});
