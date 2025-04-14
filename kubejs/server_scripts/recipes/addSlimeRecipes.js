console.info("[SOCIETY] addSlimeRecipes.js loaded");

ServerEvents.recipes((e) => {
  e.remove({ output: "splendid_slimes:slime_heart" });
  global.plorts.forEach((plort) => {
    e.custom({
      type: "splendid_slimes:plort_pressing",
      ingredients: [
        {
          count: 32,
          item: "splendid_slimes:plort",
          nbt: {
            plort: {
              id: `${plort.type}`,
            },
          },
        },
      ],
      result: {
        item: "splendid_slimes:slime_heart",
        nbt: {
          slime: {
            id: `${plort.type}`,
          },
        },
      },
    });
  });
});
