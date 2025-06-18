console.info("[SOCIETY] regretCrystals.js loaded");

const resetSkills = (tree, server, player) => {
  server.runCommandSilent(
    `playsound stardew_fishing:fish_escape block @a ${player.x} ${player.y} ${player.z}`
  );
  server.runCommandSilent(`puffish_skills category erase ${player.username} society:${tree}`);
  server.runCommandSilent(`puffish_skills points set ${player.username} society:${tree} 0`);
  server.runCommandSilent(
    `puffish_skills experience set ${player.username} society:${tree} ${
      tree === "farming" ? 17500 : 8750
    }`
  );
  e.player.tell(Text.gray(`Reset all your ${tree} skills!`));
};

ItemEvents.rightClicked("society:crystal_of_regret_farming", (e) => {
  if (e.player.stages.has("soil_inspector") || e.player.stages.has("sticky_crops")) {
    resetSkills("farming", e.server, e.player);
    e.item.count--;
  } else {
    e.player.tell(Text.red(`You aren't high enough level to use this!`));
  }
});

ItemEvents.rightClicked("society:crystal_of_regret_husbandry", (e) => {
  if (e.player.stages.has("animal_whisperer") || e.player.stages.has("bribery")) {
    resetSkills("husbandry", e.server, e.player);
    e.item.count--;
  } else {
    e.player.tell(Text.red(`You aren't high enough level to use this!`));
  }
});

ItemEvents.rightClicked("society:crystal_of_regret_mining", (e) => {
  if (e.player.stages.has("furniture_archaeologist") || e.player.stages.has("blockchain")) {
    resetSkills("mining", e.server, e.player);
    e.item.count--;
  } else {
    e.player.tell(Text.red(`You aren't high enough level to use this!`));
  }
});

ItemEvents.rightClicked("society:crystal_of_regret_fishing", (e) => {
  if (e.player.stages.has("mystical_ocean")) {
    resetSkills("fishing", e.server, e.player);
    e.item.count--;
  } else {
    e.player.tell(Text.red(`You aren't high enough level to use this!`));
  }
});

ItemEvents.rightClicked("society:crystal_of_regret_adventuring", (e) => {
  if (e.player.stages.has("fence") || e.player.stages.has("dragonslayer")) {
    resetSkills("adventuring", e.server, e.player);
    e.item.count--;
  } else {
    e.player.tell(Text.red(`You aren't high enough level to use this!`));
  }
});
