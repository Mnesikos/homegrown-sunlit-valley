console.info("[SOCIETY] gnome.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:gnome", "cardinal")
    .property(integerProperty.create("type", 0, 2))
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Right click to toggle poses"));
      item.modelJson({
        parent: "society:block/gnome/base",
      });
    })
    .defaultState((state) => {
      state.set(integerProperty.create("type", 0, 2), 0);
    })
    .placementState((state) => {
      state.set(integerProperty.create("type", 0, 3), 0);
    })
    .rightClick((click) => {
      const { block, hand } = click;
      const type = Number(block.properties.get("type"));
      const facing = block.properties.get("facing");

      if (hand == "OFF_HAND") return;
      if (hand == "MAIN_HAND") {
        block.set(block.id, {
          facing: facing,
          type: type == 2 ? "0" : String(type + 1),
        });
      }
    }).blockstateJson = {
    multipart: []
      .concat(getGnomeState("base", 0))
      .concat(getGnomeState("fish", 1))
      .concat(getGnomeState("twig", 2)),
  };
});
