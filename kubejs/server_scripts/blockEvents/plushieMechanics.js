BlockEvents.placed(global.plushies, (e) => {
  const plushieNbt = e.player.getHeldItem("main_hand").getNbt();
  if (plushieNbt) {
    e.block.set(e.block.id, {
      facing: e.block.getProperties().get("facing"),
      quest_id: plushieNbt.get("quest_id").toString(),
      affection: plushieNbt.get("affection").toString(),
      quality: plushieNbt.get("quality_food").get("quality").toString(),
      type: plushieNbt.get("type").toString(),
    });
  }
});
BlockEvents.broken(global.plushies, (e) => {
  const { block } = e;
  const type = block.properties.get("type").toLowerCase();
  if (type !== "0") {
    block.popItem(
      Item.of(
        block.id,
        `{quality_food:{quality:${block.properties.get(
          "quality"
        )}},type:${type},quest_id:${block.properties.get(
          "quest_id"
        )},affection:${block.properties.get("affection")}}`
      )
    );
  }
});

BlockEvents.rightClicked(global.plushies, (e) => {
  const { item, block, player, level, hand } = e;
  const properties = block.properties;
  const affection = Number(properties.get("affection").toLowerCase());
  const type = Number(properties.get("type").toLowerCase());
  const quest_id = Number(properties.get("quest_id").toLowerCase());

  if (player.isFake()) return;
  if (hand == "OFF_HAND") return;
  if (hand == "MAIN_HAND") {
    if (quest_id > 0) {
      let questList = Ingredient.of(global.plushieTraits[type].tag).itemIds;
      let questItem = questList[affection * (questList.length < 12 ? 2 : 3) + quest_id - 1];
      let questName = Item.of(questItem).displayName;
      if (item && item == questItem) {
        if (!player.isCreative()) item.count--;
        level.spawnParticles(
          "minecraft:heart",
          true,
          block.x + 0.5,
          block.y + 0.5,
          block.z + 0.5,
          0.1 * rnd(1, 4),
          0.1 * rnd(1, 4),
          0.1 * rnd(1, 4),
          10,
          0.1
        );
        block.set(block.id, {
          facing: properties.get("facing").toLowerCase(),
          quest_id: affection == 3 ? "0" : String(rnd(1, 3)),
          affection: String(affection + 1),
          quality: properties.get("quality").toLowerCase(),
          type: String(type),
        });
        player.tell("§c❤ §7Thank you for the wonderful gift!");
      } else {
        player.tell("§c❤ §7I would be much happier if I had this...");
        player.tell(questName);
      }
    }
  }
});
