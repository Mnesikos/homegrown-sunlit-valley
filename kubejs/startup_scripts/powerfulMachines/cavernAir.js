// priority: 1
console.info("[SOCIETY] cavernAir.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:cavern_air")
    .box(0, 0, 0, 0, 0, 0)
    .property(integerProperty.create("type", 0, 4))
    .property(integerProperty.create("chunkbit", 0, 1))
    .model("minecraft:block/air")
    .hardness(-1)
    .resistance(3600000)
    .defaultState((state) => {
      state.set(integerProperty.create("type", 0, 4), 0);
      state.set(integerProperty.create("chunkbit", 0, 1), 0);
    })
    .placementState((state) => {
      state.set(integerProperty.create("type", 0, 4), 0);
      state.set(integerProperty.create("chunkbit", 0, 1), 0);
    });
});
