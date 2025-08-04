console.info("[SOCIETY] plushieReRegister.js loaded");

StartupEvents.registry("block", (event) => {
  global.originalPlushies.forEach((plushie) => {
    const splitStr = plushie.split(":");
    let modelPath = `${splitStr[0]}:block/${splitStr[1]}`;
    if (splitStr[0].equals("tanukidecor"))
      modelPath = `tanukidecor:/block/mini_figure/${splitStr[1]}`;
    event
      .create(`${splitStr[0]}:adv_${splitStr[1]}`, "cardinal")
      .property(integerProperty.create("type", 0, global.plushieTraits.length))
      .property(integerProperty.create("quest_id", 0, 3))
      .property(integerProperty.create("quality", 0, 4))
      .property(integerProperty.create("affection", 0, 4))
      .defaultCutout()
      .soundType("wool")
      .hardness(1.0)
      .requiresTool(false)
      .model(modelPath)
      .item((item) => {
        item.modelJson({
          parent: modelPath,
        });
      })
      .defaultState((state) => {
        state
          .set(integerProperty.create("type", 0, global.plushieTraits.length), 0)
          .set(integerProperty.create("quest_id", 0, 3), 0)
          .set(integerProperty.create("quality", 0, 4), 0)
          .set(integerProperty.create("affection", 0, 4), 0);
      })
      .placementState((state) => {
        state
          .set(integerProperty.create("type", 0, global.plushieTraits.length), 0)
          .set(integerProperty.create("quest_id", 0, 3), 0)
          .set(integerProperty.create("quality", 0, 4), 0)
          .set(integerProperty.create("affection", 0, 4), 0);
      });
  });
});
