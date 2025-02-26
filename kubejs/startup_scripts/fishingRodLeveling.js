console.info("[SOCIETY] fishingRodLeveling.js loaded");

let maxLureLevel = 4;
let maxLuckOfTheSeaLevel = 6;

ForgeEvents.onEvent(
  "net.minecraftforge.event.entity.player.ItemFishedEvent",
  (e) => {
    let randCap = 20;
    const player = e.getEntity();
    const mainHandItem = player.getHeldItem("main_hand");
    const enchantmentTags = mainHandItem.enchantmentTags;
    const validRods = [
      "aquaculture:iron_fishing_rod",
      "aquaculture:gold_fishing_rod",
      "aquaculture:diamond_fishing_rod",
      "aquaculture:neptunium_fishing_rod",
      "netherdepthsupgrade:lava_fishing_rod",
    ];
    if (!validRods.includes(mainHandItem.getId())) return;

    if (player.level.isRaining()) {
      randCap = 10;
    }

    const randomNum = Math.floor(Math.random() * randCap);
    if (randomNum == 0) {
      const lureLevel = mainHandItem.getEnchantmentLevel("minecraft:lure");
      const luckOfTheSeaLevel = mainHandItem.getEnchantmentLevel(
        "minecraft:luck_of_the_sea"
      );
      if (lureLevel < maxLureLevel && Math.floor(Math.random() * 2) == 0) {
        for (let i = 0; i < enchantmentTags.size(); i++) {
          let enchantment = enchantmentTags.get(i);
          if (enchantment.get("id") == "minecraft:lure") {
            enchantmentTags.remove(i);
          }
        }
        mainHandItem.enchantStack("minecraft:lure", lureLevel + 1);
        player.tell(Text.gold("Your fishing rod leveled up! Lure Increased"));
      } else if (luckOfTheSeaLevel < maxLuckOfTheSeaLevel) {
        for (let i = 0; i < enchantmentTags.size(); i++) {
          let enchantment = enchantmentTags.get(i);
          if (enchantment.get("id") == "minecraft:luck_of_the_sea") {
            enchantmentTags.remove(i);
          }
        }
        mainHandItem.enchantStack(
          "minecraft:luck_of_the_sea",
          luckOfTheSeaLevel + 1
        );
        player.tell(
          Text.gold("Your fishing rod leveled up! Luck of the Sea Increased")
        );
      }
    }
  }
);
