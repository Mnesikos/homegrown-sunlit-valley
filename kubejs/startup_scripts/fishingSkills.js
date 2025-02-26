console.info("[SOCIETY] fishingSkills.js loaded");

ForgeEvents.onEvent(
  "net.minecraftforge.event.entity.player.ItemFishedEvent",
  (e) => {
    const player = e.getEntity();

    e.getDrops().forEach((drop) => {
      Item.of(drop)
        .getTags()
        .toList()
        .forEach((tag) => {
          if (tag.toString().includes("minecraft:fishes")) {
            let reward = player.level.createEntity("minecraft:item");
            reward.x = player.x;
            reward.y = player.y;
            reward.z = player.z;
            if (player.stages.has("fly_fisher")) {
              reward.item = `1x ${Item.of(drop).getId()}`
            }
            if (player.stages.has("school_fisher")) {
              reward.item = `5x ${Item.of(drop).getId()}`
            }
            reward.spawn();
          }
        });
    });
  }
);
