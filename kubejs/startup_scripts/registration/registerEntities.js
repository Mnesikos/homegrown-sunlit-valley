global.carpetTick = (entity) => {
  let nearbyEntities = entity.level
    .getEntitiesWithin(entity.getBoundingBox().inflate(1.5))
    .filter((entity) => entity.isPlayer() && !entity.getLevel().isClientSide());
  if (nearbyEntities.length > 0) {
    let player = nearbyEntities[0];
    if (player.isCrouching()) {
      entity.setRemoved("unloaded_to_chunk");
      Utils.getServer().runCommandSilent(
        `playsound minecraft:block.wool.break block @a ${player.x} ${player.y} ${player.z}`
      );
      player.give(Item.of("society:paw_carpet"));
    }
  }
};

StartupEvents.registry("entity_type", (e) => {
  e.create("society:paw_carpet", "entityjs:nonliving")
    .isAttackable(true)
    .isPickable(true)
    .tick((entity) => {
      if (entity.age % 20 != 0) return;
      global.carpetTick(entity);
    });
});
