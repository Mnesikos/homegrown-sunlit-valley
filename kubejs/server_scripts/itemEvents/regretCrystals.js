console.info("[SOCIETY] regretCrystals.js loaded");

const resetSkills = (tree, server, player) => {
  server.runCommandSilent(
    `playsound stardew_fishing:fish_escape block @a ${player.x} ${player.y} ${player.z}`
  );
  server.runCommandSilent(
    `puffish_skills category erase ${player.username} society:${tree}`
  );
  server.runCommandSilent(
    `puffish_skills points set ${player.username} society:${tree} 0`
  );
  server.runCommandSilent(
    `puffish_skills experience set ${player.username} society:${tree} ${tree === "farming" ? 17500 : 8750}`
  );
  player.tell(Text.gray(`Reset all your ${tree} skills!`));
};

ItemEvents.rightClicked("society:crystal_of_regret_farming", (e) => {
  resetSkills("farming", e.server, e.player);
  e.item.count--;
});

ItemEvents.rightClicked("society:crystal_of_regret_husbandry", (e) => {
  resetSkills("husbandry", e.server, e.player);
  e.item.count--;
});

ItemEvents.rightClicked("society:crystal_of_regret_mining", (e) => {
  resetSkills("mining", e.server, e.player);
  e.item.count--;
});

ItemEvents.rightClicked("society:crystal_of_regret_fishing", (e) => {
  resetSkills("fishing", e.server, e.player);
  e.item.count--;
});

ItemEvents.rightClicked("society:crystal_of_regret_adventuring", (e) => {
  resetSkills("adventuring", e.server, e.player);
  e.item.count--;
});