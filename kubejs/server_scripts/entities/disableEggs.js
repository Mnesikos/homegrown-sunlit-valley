console.info("[SOCIETY] disableEggs.js loaded");

const eggs = [
  "minecraft:egg",
  "autumnity:turkey_egg",
  "untitledduckmod:goose_egg",
  "untitledduckmod:duck_egg",
  "farmlife:galliraptor_egg",
];
EntityEvents.spawned(eggs, (e) => {
  let entity = e.entity;
  if (entity.type == "minecraft:egg") {
    if (entity.getDefaultItem() != "dragnlivestock:fertilized_egg") e.cancel();
  }
  else e.cancel();
});

ItemEvents.rightClicked(eggs, (e) => {
  if (!e.player.isCrouching()) e.cancel();
});
