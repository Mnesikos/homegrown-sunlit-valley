console.info("[SOCIETY] addFishBaits.js loaded");

ServerEvents.recipes((e) => {
  global.fish.forEach((fish) => {
    const splitFish = fish.item.split(":");
    let fishId = splitFish[1];
    if (
      ["barrel", "roe", "meat"].some((denied) => splitFish[1].includes(denied))
    )
      return;
    if (fishId.includes("raw_")) {
      fishId = fishId.substring(4, fishId.length);
    }
    e.custom({
      type: "lilis_lucky_lures:fish_trap",
      bait_item: {
        item: `society:${fishId}_bait`,
      },
      catch: {
        result: {
          item: fish.item,
          count: 1,
        },
      },
      catch_duration: {
        min: fish.value * 32,
        max: fish.value * 48,
      },
    });
  });
});
