console.info("[SOCIETY] forageBushLoot.js loaded");

LootJS.modifiers((e) => {
  e.addBlockLootModifier("society:forage_berry_bush")
    .playerPredicate((p) => global.getSeasonFromLevel(p.level) === "spring")
    .addLoot(Item.of("4x society:salmonberry"));

  e.addBlockLootModifier("society:forage_berry_bush")
    .playerPredicate((p) => global.getSeasonFromLevel(p.level) === "summer")
    .addLoot(Item.of("4x society:boysenberry"));

  e.addBlockLootModifier("society:forage_berry_bush")
    .playerPredicate((p) => global.getSeasonFromLevel(p.level) === "autumn")
    .addLoot(Item.of("4x society:cranberry"));

  e.addBlockLootModifier("society:forage_berry_bush")
    .playerPredicate((p) => global.getSeasonFromLevel(p.level) === "winter")
    .addLoot(Item.of("4x society:crystalberry"));
});
