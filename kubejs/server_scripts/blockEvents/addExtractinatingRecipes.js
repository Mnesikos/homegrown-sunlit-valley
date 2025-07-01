console.info("[SOCIETY] addExtractinatingRecipes.js loaded");

const relicTroveTable = [
  {
    drop: "#society:relics",
    drop_chance: 1,
  },
];

const artifactTroveTable = [
  {
    drop: "#society:artifacts",
    drop_chance: 1,
  },
];
const geodeLootTabe = [
  {
    drop: "#society:geode_junk",
    drop_chance: 0.9,
  },
  {
    drop: "#society:geode_bonus",
    drop_chance: 0.3,
  },
  {
    drop: "#society:geode_treasure",
    drop_chance: 0.2,
  },
  {
    drop: "#society:geode_relic",
    drop_chance: 0.01,
  },
];
const frozenGeodeLootTabe = [
  {
    drop: "#society:geode_junk",
    drop_chance: 0.9,
  },
  {
    drop: "#society:frozen_geode_bonus",
    drop_chance: 0.3,
  },
  {
    drop: "#society:frozen_geode_treasure",
    drop_chance: 0.2,
  },
  {
    drop: "#society:frozen_geode_relic",
    drop_chance: 0.01,
  },
];
const magmaGeodeLootTabe = [
  {
    drop: "#society:geode_junk",
    drop_chance: 0.9,
  },
  {
    drop: "#society:magma_geode_bonus",
    drop_chance: 0.3,
  },
  {
    drop: "#society:magma_geode_treasure",
    drop_chance: 0.2,
  },
  {
    drop: "#society:magma_geode_relic",
    drop_chance: 0.01,
  },
];
const omniGeodeLootTabe = [
  {
    drop: "#society:geode_junk",
    drop_chance: 0.9,
  },
  {
    drop: "#society:omni_geode_bonus",
    drop_chance: 0.4,
  },
  {
    drop: "#society:omni_geode_treasure",
    drop_chance: 0.6,
  },
  {
    drop: "#society:omni_geode_special",
    drop_chance: 0.03,
  },
];
const validExtractinatorItems = [
  "society:relic_trove",
  "society:artifact_trove",
  "society:geode",
  "society:frozen_geode",
  "society:magma_geode",
  "society:omni_geode",
];
const processGeodeLootTabe = (lootTable, block) => {
  let drops;
  lootTable.forEach((entry) => {
    if (Math.random() < entry.drop_chance) {
      drops = Ingredient.of(entry.drop).itemIds;
      block.popItemFromFace(drops[Math.floor(Math.random() * drops.length)], "up");
    }
  });
};

BlockEvents.rightClicked('extractinator:extractinator', (e) => {
  const { block, player, hand, item, server } = e;
  if (hand == "OFF_HAND") return;
  const heldItem = item.getId();
  if (!validExtractinatorItems.includes(heldItem)) return;

  switch (heldItem) {
    case "society:relic_trove":
      processGeodeLootTabe(relicTroveTable, block);
      break;
    case "society:artifact_trove":
      processGeodeLootTabe(artifactTroveTable, block);
      break;
    case "society:geode":
      processGeodeLootTabe(geodeLootTabe, block);
      break;
    case "society:frozen_geode":
      processGeodeLootTabe(frozenGeodeLootTabe, block);
      break;
    case "society:magma_geode":
      processGeodeLootTabe(magmaGeodeLootTabe, block);
      break;
    case "society:omni_geode":
      processGeodeLootTabe(omniGeodeLootTabe, block);
      break;
    default:
      break;
  }
  if (!player.isCreative()) item.count--;
  server.runCommandSilent(
    `playsound stardew_fishing:complete block @a ${player.x} ${player.y} ${player.z}`
  );
  player.addItemCooldown(item.id, 4);
});
