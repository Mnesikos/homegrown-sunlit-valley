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

  const addFusion = (top, bottom, output) => {
    e.custom({
      type: "splendid_slimes:plort_pressing",
      ingredients: [
        {
          item: "splendid_slimes:slime_heart",
          nbt: {
            slime: {
              id: `splendid_slimes:${top}`,
            },
          },
        },
      ],
      output: {
        item: "splendid_slimes:slime_heart",
        nbt: {
          slime: {
            id: `splendid_slimes:${bottom}`,
          },
        },
      },
      result: {
        item: "splendid_slimes:slime_heart",
        nbt: {
          slime: {
            id: `splendid_slimes:${output}`,
          },
        },
      },
    });
  };
  addFusion("luminous", "webby", "all_seeing");
  addFusion("boomcat", "blazing", "bitwise");
  addFusion("weeping", "puddle", "prisma");

  
  e.custom({
    type: "splendid_slimes:plort_pressing",
    ingredients: [
      {
        item: "society:magic_rock_candy",
      },
    ],
    output: {
      item: "splendid_slimes:slime_heart",
      nbt: {
        slime: {
          id: "splendid_slimes:slimy",
        },
      },
    },
    result: {
      item: "splendid_slimes:slime_heart",
      nbt: {
        slime: {
          id: "splendid_slimes:sweet",
        },
      },
    },
  });
});
