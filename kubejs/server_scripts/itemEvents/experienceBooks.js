console.info("[SOCIETY] experienceBooks.js loaded");

const addExperience = (player, server, item, type) => {
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:${type} 1000`
  );
  server.runCommandSilent(
    `playsound minecraft:block.enchantment_table.use block @a ${player.x} ${player.y} ${player.z}`
  );
  item.count--;
  player.addItemCooldown(item, 2);
};
ItemEvents.rightClicked("society:yard_work_yearly", (e) => {
  const { server, player, item } = e;
  addExperience(player, server, item, "farming");
});
ItemEvents.rightClicked("society:husbandry_hourly", (e) => {
  const { server, player, item } = e;
  addExperience(player, server, item, "husbandry");
});
ItemEvents.rightClicked("society:mining_monthly", (e) => {
  const { server, player, item } = e;
  addExperience(player, server, item, "mining");
});

ItemEvents.rightClicked("society:combat_quarterly", (e) => {
  const { server, player, item } = e;
  addExperience(player, server, item, "adventuring");
});

ItemEvents.rightClicked("society:wet_weekly", (e) => {
  const { server, player, item } = e;
  addExperience(player, server, item, "fishing");
});

ItemEvents.rightClicked("society:book_of_stars", (e) => {
  const { server, player, item } = e;
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:farming 750`
  );
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:husbandry 400`
  );
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:mining 750`
  );
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:adventuring 750`
  );
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:fishing 750`
  );
  server.runCommandSilent(
    `playsound minecraft:block.enchantment_table.use block @a ${player.x} ${player.y} ${player.z}`
  );
  item.count--;
  player.addItemCooldown(item, 2);
});