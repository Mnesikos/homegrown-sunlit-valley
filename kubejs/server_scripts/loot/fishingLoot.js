console.info("[SOCIETY] fishingLoot.js loaded");

LootJS.modifiers((e) => {
  e.addLootTypeModifier(LootType.FISHING)
    .hasAnyStage("mystical_ocean")
    .pool((p) => {
      p.randomChance(0.05).addLoot("society:neptuna");
    });

  e.addLootTypeModifier(LootType.FISHING)
    .hasAnyStage("wooden_pollution")
    .pool((p) => {
      p.randomChance(0.1).addLoot("society:furniture_box");
    });

  e.addLootTypeModifier(LootType.FISHING)
    .hasAnyStage("frozen_treasure")
    .playerPredicate((p) => global.getSeasonFromLevel(p.level) === "winter")
    .pool((p) => {
      p.randomChance(0.2).addLoot("aquaculture:treasure_chest");
    });

  e.addLootTypeModifier(LootType.CHEST)
    .hasAnyStage("prismatic_bounty")
    .replaceLoot(
      "aquaculture:message_in_a_bottle",
      "society:prismatic_shard",
      true
    );
});
