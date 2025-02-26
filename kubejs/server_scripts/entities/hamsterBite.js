console.info("[SOCIETY] hamsterBite.js loaded");

ItemEvents.entityInteracted((e) => {
  const { hand, player, level, target, server, item } = e;
  if (hand == "OFF_HAND") return;
  if (target.type !== "hamsters:hamster") return;
  if (hand == "MAIN_HAND" && item === "society:animal_feed") {
    server.runCommandSilent(
      `playsound minecraft:entity.generic.eat block @a ${player.x} ${player.y} ${player.z}`
    );
    level.spawnParticles(
      "legendarycreatures:wisp_particle",
      true,
      target.x,
      target.y + 1.5,
      target.z,
      0.1 * rnd(1, 4),
      0.1 * rnd(1, 4),
      0.1 * rnd(1, 4),
      5,
      0.01
    );
    if (Math.random() < 0.08) {
      player.attack(20)
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} {anchor:3,shake:1,background:1,wrap:1,align:0,color:"#FF5555",y:-60} 5 It bit me...?`
      );
    }
    item.count--;
    player.addItemCooldown(item, 10);
  }
});
