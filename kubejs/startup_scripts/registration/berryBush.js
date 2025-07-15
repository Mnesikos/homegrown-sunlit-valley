console.info("[SOCIETY] berryBush.js loaded");

const $PushReaction = Java.loadClass("net.minecraft.world.level.material.PushReaction");

global.updateBerryBush = (level, block) => {
  let type = 0;
  switch (global.getSeasonFromLevel(level)) {
    case "spring":
      type = 1;
      break;
    case "summer":
      type = 2;
      break;
    case "autumn":
      type = 3;
      break;
    default:
    case "winter":
      type = 4;
  }
  block.set(block.id, {
    type: String(type),
  });
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:berry_bush")
    .defaultCutout()
    .hardness(0)
    .resistance(0)
    .mapColor("grass")
    .pushReaction($PushReaction.DESTROY)
    .noCollision()
    .soundType("azalea_leaves")
    .property(integerProperty.create("type", 0, 4))
    .defaultCutout()
    .item((item) => {
      item.modelJson({
        parent: "society:block/berry_bush/base",
      });
    })
    .defaultState((state) => {
      state.set(integerProperty.create("type", 0, 4), 0);
    })
    .placementState((state) => {
      state.set(integerProperty.create("type", 0, 4), 0);
    })
    .rightClick((click) => {
      const { block, level, hand } = click;

      if (hand == "OFF_HAND") return;
      if (hand == "MAIN_HAND") {
        global.updateBerryBush(level, block);
      }
    })
    .randomTick((tick) => {
      const { block, level } = tick;
      global.updateBerryBush(level, block);
    }).blockstateJson = {
    multipart: [
      {
        when: { type: "0" },
        apply: { model: "society:block/berry_bush/base" },
      },
      {
        when: { type: "1" },
        apply: { model: "society:block/berry_bush/salmonberry" },
      },
      {
        when: { type: "2" },
        apply: { model: "society:block/berry_bush/boysenberry" },
      },
      {
        when: { type: "3" },
        apply: { model: "society:block/berry_bush/cranberry" },
      },
      {
        when: { type: "4" },
        apply: { model: "society:block/berry_bush/crystalberry" },
      },
    ],
  };
});
