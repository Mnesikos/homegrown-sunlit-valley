console.info("[SOCIETY] addMiscRecipes.js loaded");

ServerEvents.recipes((e) => {
  const crushedRecipes = (input, output, outputCount) => {
    e.custom({
        type: "farm_and_charm:mincer",
        ingredient: {
          item: input,
        },
        recipe_type: "MEAT",
        result: {
          count: outputCount,
          item: output,
        },
      });
    e.custom({
        type: "create:milling",
        ingredients: [
          {
            item: input,
          },
        ],
        processingTime: 40,
        results: [
          {
            count: outputCount,
            item: output,
          },
        ],
      });
  }
  crushedRecipes("society:neptuna", "aquaculture:neptunium_nugget", 2)
  crushedRecipes("aquaculture:worm", "crabbersdelight:crab_trap_bait", 2)
  crushedRecipes("aquaculture:minnow", "crabbersdelight:crab_trap_bait", 16)
  crushedRecipes("aquaculture:leech", "crabbersdelight:crab_trap_bait", 32)

  crushedRecipes("pamhc2trees:cinnamonitem", "society:ground_cinnamon", 4)
  crushedRecipes("herbalbrews:coffee_beans", "herbalbrews:ground_coffee", 1)
  crushedRecipes("dew_drop_farmland_growth:weak_fertilizer", "farm_and_charm:fertilizer", 1)
});