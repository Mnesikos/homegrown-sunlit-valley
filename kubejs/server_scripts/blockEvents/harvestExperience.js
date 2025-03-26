console.info("[SOCIETY] harvestExperience.js loaded");

const deniedCrops = [
  "farmersdelight:tomatoes",
  "farmersdelight:budding:tomatoes",
  "minecraft:melon_stem",
  "minecraft:pumpkin_stem",
  "minecraft:cocoa",
];
const farmlands = [
  "minecraft:farmland",
  "farmingforblockheads:fertilized_farmland_rich",
  "farmingforblockheads:fertilized_farmland_rich_stable",
  "farmingforblockheads:fertilized_farmland_healthy",
  "farmingforblockheads:fertilized_farmland_healthy_stable",
  "farmingforblockheads:fertilized_farmland_stable",
];
BlockEvents.rightClicked((e) => {
  const { block, player, server, hand, item, level } = e;
  if (farmlands.includes(block.id) && player.isFake()) e.cancel();
  if (hand == "MAIN_HAND") {
    if (block.hasTag("minecraft:crops")) {
      let xpCount = 0;
      let radius = 0;
      if (item.hasTag("minecraft:hoes")) radius = 1;
      if (
        [
          "minecraft:netherite_hoe",
          "minecraft:diamond_hoe",
          "botania:elementium_hoe",
        ].includes(item.id)
      )
        radius = 2;
      for (let pos of BlockPos.betweenClosed(
        new BlockPos(block.x - radius, block.y, block.z - radius),
        [block.x + radius, block.y, block.z + radius]
      )) {
        let checkBlocked = level.getBlock(pos);
        if (
          checkBlocked.hasTag("minecraft:crops") &&
          !deniedCrops.includes(checkBlocked.id)
        ) {
          const blockState = level.getBlockState(pos);
          const cropBlock = blockState.block;
          if (cropBlock.isMaxAge(blockState)) {
            if (player.isFake()) {
              e.cancel();
            } else {
              xpCount += cropBlock.getMaxAge();
            }
          }
        }
      }
      if (xpCount > 0) {
        const xp = block.createEntity("experience_orb");
        xp.mergeNbt({ Value: xpCount });
        xp.spawn();
        server.runCommandSilent(
          `puffish_skills experience add ${player.username} society:farming ${
            xpCount * 2
          }`
        );
      }
    }
  }
});
