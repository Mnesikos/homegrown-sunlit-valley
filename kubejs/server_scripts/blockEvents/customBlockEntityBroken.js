console.info("[SOCIETY] customBlockEntityBroken.js loaded");

BlockEvents.broken("society:seed_maker", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.seedMakerRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:ancient_cog"));
  }
});

BlockEvents.broken("society:preserves_jar", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.preservesJarRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:stone_hand"));
  }
});

BlockEvents.broken("society:dehydrator", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.dehydratorRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:cordycep"));
  }
});

BlockEvents.broken("society:mayonnaise_machine", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.mayonnaiseMachineRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
});

BlockEvents.broken("society:crystalarium", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.crystalariumCrystals[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:black_opal"));
  }
});

BlockEvents.broken("society:aging_cask", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.agingCaskRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:broken_clock"));
  }
});

BlockEvents.broken("society:ancient_cask", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.ancientCaskRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:inserter"));
  }
});

BlockEvents.broken("society:fish_smoker", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.fishSmokerRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:ancient_roe"));
  }
});

BlockEvents.broken("society:bait_maker", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    global.baitMakerRecipes[
      Number(e.block.properties.get("type").toLowerCase()) - 1
    ].output.forEach((element) => {
      e.block.popItem(element);
    });
  }
});

BlockEvents.broken("society:fish_pond", (e) => {
  const pondType = e.block.properties.get("type").toLowerCase();
  if (pondType !== "0") {
    const fish = global.fishPondDefinitions[Number(pondType) - 1].item;
    e.block.popItem(
      Item.of(`${e.block.properties.get("population").toLowerCase()}x ${fish}`)
    );
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:sea_biscut"));
  }
    e.block.popItem(Item.of("society:fish_pond"));
});

BlockEvents.broken("society:deluxe_worm_farm", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    e.block.popItem(Item.of("4x crabbersdelight:deluxe_crab_trap_bait"));
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:infinity_worm"));
  }
});

BlockEvents.broken("society:loom", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    e.block.popItem("society:canvas");
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:tiny_gnome"));
  }
});

BlockEvents.broken("society:charging_rod", (e) => {
  if (e.block.properties.get("mature").toLowerCase() == "true") {
    e.block.popItem("society:battery");
  }
  if (e.block.properties.get("upgraded").toLowerCase() == "true") {
    e.block.popItem(Item.of("society:frosted_tip"));
  }
});

BlockEvents.broken("society:prize_machine", (e) => {
  e.block.popItem(
    Item.of(
      "society:prize_machine",
      `{prize:${e.block.properties.get("prize")}}`
    )
  );
});
BlockEvents.broken(
  [
    "society:iron_sprinkler",
    "society:gold_sprinkler",
    "society:diamond_sprinkler",
    "society:netherite_sprinkler",
  ],
  (e) => {
    if (e.block.properties.get("sticklogged").toLowerCase() == "true") {
      e.block.popItem("minecraft:stick");
    }
  }
);
BlockEvents.broken("society:coin_leaderboard", (e) => {
  const { x, y, z } = e.block;
  Utils.server
    .getLevel("minecraft:overworld")
    .getEntities()
    .forEach((entity) => {
      entity.getTags().forEach((tag) => {
        if (tag === `leaderboard-${x}-${y}-${z}`) {
          entity.kill();
        }
      });
    });
});
