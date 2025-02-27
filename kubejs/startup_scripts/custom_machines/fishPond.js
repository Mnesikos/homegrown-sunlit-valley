console.info("[SOCIETY] fishPond.js loaded");

const getRequestedItems = (fish, population) => {
  let requestedItems = {};
  fish.quests.forEach((quest) => {
    if (quest.population == population) {
      requestedItems = quest.requestedItems;
    }
  });
  return requestedItems;
};

const getPondProperties = (block) => {
  const properties = block.properties;
  return {
    facing: properties.get("facing"),
    valid: properties.get("valid"),
    mature: properties.get("mature").toLowerCase(),
    upgraded: properties.get("upgraded").toLowerCase(),
    quest: properties.get("quest").toLowerCase(),
    quest_id: properties.get("quest_id").toLowerCase(),
    type: properties.get("type").toLowerCase(),
    population: properties.get("population").toLowerCase(),
    max_population: properties.get("max_population").toLowerCase(),
  };
};

const validatePond = (tickEvent, lavaFish) => {
  const { block } = tickEvent;
  const { x, y, z } = block;
  const facing = block.properties.get("facing");
  const level = block.getLevel();
  const pondWaterCheckMap = {
    north: {
      startX: 1,
      startZ: 4,
      endX: -1,
      endZ: 1,
    },
    south: {
      startX: -1,
      startZ: -4,
      endX: 1,
      endZ: -1,
    },
    east: {
      startX: -1,
      startZ: 1,
      endX: -4,
      endZ: -1,
    },
    west: {
      startX: 1,
      startZ: -1,
      endX: 4,
      endZ: 1,
    },
  };
  const pondCheckMap = {
    north: {
      xOffset: 0,
      zOffset: 5,
    },
    south: {
      xOffset: 0,
      zOffset: -5,
    },
    east: {
      xOffset: -5,
      zOffset: 0,
    },
    west: {
      xOffset: 5,
      zOffset: 0,
    },
  };
  const adjacentPondMap = {
    north: {
      xOffset: 1,
      zOffset: 0,
    },
    south: {
      xOffset: 1,
      zOffset: 0,
    },
    east: {
      xOffset: 0,
      zOffset: 1,
    },
    west: {
      xOffset: 0,
      zOffset: 1,
    },
  };
  const { startX, startZ, endX, endZ } = pondWaterCheckMap[facing];
  const { xOffset, zOffset } = pondCheckMap[facing];
  const blockAcross = new BlockPos(x + xOffset, y, z + zOffset);
  const conflictingPonds =
    level.getBlock(blockAcross).id === "society:fish_pond" ||
    level.getBlock(
      new BlockPos(
        x + adjacentPondMap[facing].xOffset,
        y,
        z + adjacentPondMap[facing].zOffset
      )
    ).id === "society:fish_pond" ||
    level.getBlock(
      new BlockPos(
        x - adjacentPondMap[facing].xOffset,
        y,
        z - adjacentPondMap[facing].zOffset
      )
    ).id === "society:fish_pond";
  let waterAmount = 0;
  let scannedId = "";

  for (let pos of BlockPos.betweenClosed(
    new BlockPos(x + startX, y, z + startZ),
    [x + endX, y, z + endZ]
  )) {
    scannedId = level.getBlock(pos).id;
    if (lavaFish && scannedId === "minecraft:lava") {
      waterAmount += 1;
    } else if (
      !lavaFish &&
      (scannedId === "minecraft:water" || scannedId === "minecraft:ice")
    ) {
      waterAmount += 1;
    }
  }
  if (waterAmount !== 12 || conflictingPonds) return false;
  return true;
};
const handleFishInsertion = (fish, recipeIndex, clickEvent) => {
  const { item, block, player, level } = clickEvent;
  const {
    facing,
    valid,
    mature,
    upgraded,
    quest,
    quest_id,
    type,
    population,
    max_population,
  } = getPondProperties(block);
  if (item == fish.item && (type == `${recipeIndex + 1}` || type == "0")) {
    if (type == "0") {
      successParticles(level, block);
      block.set(block.id, {
        facing: facing,
        valid: true,
        mature: false,
        upgraded: upgraded,
        quest: false,
        quest_id: "0",
        population: "1",
        max_population: "3",
        type: "" + (recipeIndex + 1),
      });
      if (!player.isCreative()) item.count--;
    } else if (population !== max_population && !player.stages.has("mitosis")) {
      successParticles(level, block);
      block.set(block.id, {
        facing: facing,
        valid: valid,
        mature: mature,
        upgraded: upgraded,
        quest: quest,
        quest_id: quest_id,
        population: increaseStage(population),
        max_population: max_population,
        type: type,
      });
      if (!player.isCreative()) item.count--;
    }
  }
};

const handleQuestSubmission = (fish, clickEvent) => {
  const { item, block, player, level } = clickEvent;
  const {
    facing,
    valid,
    quest_id,
    mature,
    upgraded,
    type,
    population,
    max_population,
  } = getPondProperties(block);
  const questContent = getRequestedItems(fish, Number(max_population))[
    quest_id
  ];
  if (item && item == questContent.item) {
    if (item.count >= questContent.count) {
      successParticles(level, block);
      block.set(block.id, {
        facing: facing,
        valid: valid,
        mature: mature,
        upgraded: upgraded,
        quest: false,
        quest_id: "0",
        population: population,
        max_population: increaseStage(
          max_population,
          max_population === "7" ? 3 : 2
        ),
        type: type,
      });
      clickEvent.server.scheduleInTicks(2, () => {
        player.tell(Text.green(`🐟: This really makes us feel at home!`));
      });
      if (!player.isCreative()) item.count = item.count - questContent.count;
    } else {
      clickEvent.server.scheduleInTicks(2, () => {
        player.tell(
          Text.red(
            `🐟: Thanks but we need §3${
              questContent.count - item.count
            }§r more of these to be happy§r...`
          )
        );
      });
    }
  }
};

const handleFishHarvest = (fish, clickEvent) => {
  const { block, player, server } = clickEvent;
  const {
    facing,
    valid,
    upgraded,
    quest,
    quest_id,
    type,
    population,
    max_population,
  } = getPondProperties(block);
  let additionalMaxRoe = 0;
  if (player.stages.has("caper_catcher")) additionalMaxRoe += 5;
  if (player.stages.has("caviar_catcher")) additionalMaxRoe += 5;
  let fishId = fish.item.split(":")[1];
  if (fishId.includes("raw_")) {
    if (fishId === "raw_snowflake") fishId = "frosty_fin";
    else fishId = fishId.substring(4, fishId.length);
  }
  const calculateRoe = rnd(
    Math.floor(population / 4),
    Math.floor(population / 2) + additionalMaxRoe
  );
  const roeCount = calculateRoe > 1 ? calculateRoe : 1;

  block.popItemFromFace(`${roeCount}x society:${fishId}_roe`, facing);
  if (fish.additionalRewards) {
    let fishPondRoll = 0;
    fish.additionalRewards.forEach((reward) => {
      fishPondRoll = Math.random();
      let rewardChance = reward.chance;
      if (upgraded == "true") rewardChance *= 2;
      if (player.stages.has("scum_collector")) rewardChance *= 2;
      if (population >= reward.minPopulation && fishPondRoll <= rewardChance) {
        // Rewards scale to amount of fish population relative to when reward starts spawning
        const calculateCount = Math.floor(
          reward.count *
            ((population - reward.minPopulation) / (10 - reward.minPopulation))
        );
        block.popItemFromFace(
          `${calculateCount > 1 ? calculateCount : 1}x ${reward.item}`,
          facing
        );
      }
    });
  }
  server.runCommandSilent(
    `playsound stardew_fishing:dwop block @a ${player.x} ${player.y} ${player.z}`
  );
  server.runCommandSilent(
    `puffish_skills experience add ${player.username} society:fishing ${
      roeCount * 4
    }`
  );
  block.set(block.id, {
    facing: facing,
    valid: valid,
    mature: false,
    upgraded: upgraded,
    quest: quest,
    quest_id: quest_id,
    population: population,
    max_population: max_population,
    type: type,
  });
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:fish_pond", "cardinal")
    .property(booleanProperty.create("valid"))
    .property(booleanProperty.create("mature"))
    .property(booleanProperty.create("upgraded"))
    .property(booleanProperty.create("quest"))
    .property(integerProperty.create("quest_id", 0, 3))
    .property(integerProperty.create("population", 0, 10))
    .property(integerProperty.create("max_population", 0, 10))
    .property(
      integerProperty.create("type", 0, global.fishPondDefinitions.length)
    )
    .defaultCutout()
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .item((item) => {
      item.tooltip(Text.gray("Cultivates fish. Right Click with fish to add"));
      item.modelJson({
        parent: "society:block/fish_pond",
      });
    })

    .defaultState((state) => {
      state
        .set(booleanProperty.create("valid"), true)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(booleanProperty.create("quest"), false)
        .set(integerProperty.create("quest_id", 0, 3), 0)
        .set(integerProperty.create("population", 0, 10), 0)
        .set(integerProperty.create("max_population", 0, 10), 0)
        .set(
          integerProperty.create("type", 0, global.fishPondDefinitions.length),
          0
        );
    })
    .placementState((state) => {
      state
        .set(booleanProperty.create("valid"), true)
        .set(booleanProperty.create("mature"), false)
        .set(booleanProperty.create("upgraded"), false)
        .set(booleanProperty.create("quest"), false)
        .set(integerProperty.create("quest_id", 0, 3), 0)
        .set(integerProperty.create("population", 0, 10), 0)
        .set(integerProperty.create("max_population", 0, 10), 0)
        .set(
          integerProperty.create("type", 0, global.fishPondDefinitions.length),
          0
        );
    })
    .rightClick((click) => {
      const { item, block, hand, player, server, level } = click;
      const {
        facing,
        valid,
        mature,
        upgraded,
        quest,
        quest_id,
        type,
        population,
        max_population,
      } = getPondProperties(block);
      // Prevent Deployers from using artisan machines
      if (player.isFake()) return;
      if (hand == "OFF_HAND") return;
      if (hand == "MAIN_HAND") {
        if (upgraded === false && item === "society:sea_biscut") {
          if (!player.isCreative()) item.count--;
          level.spawnParticles(
            "farmersdelight:star",
            true,
            block.x,
            block.y + 1,
            block.z,
            0.2 * rnd(1, 2),
            0.2 * rnd(1, 2),
            0.2 * rnd(1, 2),
            3,
            0.01
          );
          block.set(block.id, {
            facing: facing,
            valid: valid,
            mature: false,
            upgraded: true,
            quest: quest,
            quest_id: quest_id,
            population: population,
            max_population: max_population,
            type: type,
          });
        }
        global.fishPondDefinitions.forEach((fish, index) => {
          if (!player.isCrouching()) {
            if (quest === "true" && type == `${index + 1}`) {
              handleQuestSubmission(fish, click);
            }
            handleFishInsertion(fish, index, click);
            if (mature === "true" && type == `${index + 1}`) {
              handleFishHarvest(fish, click);
            }
          } else if (population !== "0" && type == `${index + 1}`) {
            if (player.stages.has("hot_hands")) {
              server.runCommandSilent(
                `playsound minecraft:block.lava.extinguish block @a ${player.x} ${player.y} ${player.z}`
              );
              player.give(
                Item.of(
                  `${player.stages.has("mitosis") ? 2 : 1}x ${
                    rnd25()
                      ? "minecraft:coal"
                      : `society:smoked_${fish.item.split(":")[1]}`
                  }`
                )
              );
            } else
              player.give(
                `${player.stages.has("mitosis") ? 2 : 1}x ${fish.item}`
              );
            block.set(block.id, {
              facing: facing,
              valid: valid,
              mature: false,
              upgraded: upgraded,
              quest: quest,
              quest_id: quest_id,
              population: decreaseStage(population),
              max_population: max_population,
              type: type,
            });
          }
        });
      }
    })
    .randomTick((tick) => {
      const { block, level } = tick;
      const { x, y, z } = block;
      const {
        facing,
        valid,
        mature,
        upgraded,
        quest,
        quest_id,
        type,
        population,
        max_population,
      } = getPondProperties(block);
      global.fishPondDefinitions.forEach((fish, index) => {
        if (type == `${index + 1}`) {
          block.set(block.id, {
            facing: facing,
            valid: validatePond(tick, fish.lava),
            mature: mature,
            upgraded: upgraded,
            quest: quest,
            quest_id: quest_id,
            population: population,
            max_population: max_population,
            type: type,
          });
        }
      });
      if (type !== "0" && valid === "true") {
        if (mature === "false" && Number(population) > 1 && rnd10()) {
          tick.level.spawnParticles(
            "minecraft:campfire_cosy_smoke",
            true,
            x + 0.5,
            y + 1,
            z + 0.5,
            0.1 * rnd(1, 2),
            0.1 * rnd(1, 2),
            0.1 * rnd(1, 2),
            rnd(1, 4),
            0.1
          );
          block.set(block.id, {
            facing: facing,
            valid: valid,
            mature: true,
            upgraded: upgraded,
            quest: quest,
            quest_id: quest_id,
            population: population,
            max_population: max_population,
            type: type,
          });
        } else if (
          max_population !== "10" &&
          quest !== "true" &&
          rnd10() &&
          population == max_population
        ) {
          block.set(block.id, {
            facing: facing,
            valid: valid,
            mature: false,
            upgraded: upgraded,
            quest: true,
            quest_id: `${rnd(
              0,
              getRequestedItems(
                global.fishPondDefinitions[type - 1],
                max_population
              ).length - 1
            )}`,
            population: population,
            max_population: max_population,
            type: type,
          });
        } else if (population !== max_population && rnd10()) {
          successParticles(level, block);
          block.set(block.id, {
            facing: facing,
            valid: valid,
            mature: mature,
            upgraded: upgraded,
            quest: quest,
            quest_id: quest_id,
            population: increaseStage(population),
            max_population: max_population,
            type: type,
          });
        }
      }
    }).blockstateJson = {
    multipart: [
      { apply: { model: "society:block/fish_pond_particle" } },
      {
        when: { facing: "north", upgraded: false },
        apply: { model: "society:block/fish_pond", y: 0, uvlock: false },
      },
      {
        when: { facing: "east", upgraded: false },
        apply: {
          model: "society:block/fish_pond",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { facing: "south", upgraded: false },
        apply: {
          model: "society:block/fish_pond",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { facing: "west", upgraded: false },
        apply: {
          model: "society:block/fish_pond",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { facing: "north", upgraded: true },
        apply: {
          model: "society:block/fish_pond_upgraded",
          y: 0,
          uvlock: false,
        },
      },
      {
        when: { facing: "east", upgraded: true },
        apply: {
          model: "society:block/fish_pond_upgraded",
          y: 90,
          uvlock: false,
        },
      },
      {
        when: { facing: "south", upgraded: true },
        apply: {
          model: "society:block/fish_pond_upgraded",
          y: 180,
          uvlock: false,
        },
      },
      {
        when: { facing: "west", upgraded: true },
        apply: {
          model: "society:block/fish_pond_upgraded",
          y: -90,
          uvlock: false,
        },
      },
      {
        when: { mature: true },
        apply: { model: "society:block/machine_done" },
      },
      {
        when: { quest: true, mature: false },
        apply: { model: "society:block/pond_quest" },
      },
    ],
  };
});
