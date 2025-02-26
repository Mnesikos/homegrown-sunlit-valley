console.info("[SOCIETY] furnitureOpening.js loaded");

ItemEvents.rightClicked("society:furniture_box", e => {
  e.server.runCommandSilent(
    `playsound minecraft:ui.stonecutter.take_result block @a ${e.player.x} ${e.player.y} ${e.player.z}`
  );

  const furniture = Ingredient.of("#society:loot_furniture").itemIds;

  e.item.count--;
  let reward = e.player.level.createEntity("minecraft:item");
  reward.x = e.player.x;
  reward.y = e.player.y;
  reward.z = e.player.z;
  
  reward.item = furniture[Math.floor(Math.random() * furniture.length)];

    reward.spawn();
    e.server.runCommandSilent(
      `playsound stardew_fishing:complete block @a ${e.player.x} ${e.player.y} ${e.player.z}`
    );
  e.player.addItemCooldown("society:furniture_box", 2);
});
