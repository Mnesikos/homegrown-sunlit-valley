ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(Commands.literal("weeping").executes((c) => global.weepingWater(c)));


});
global.weepingWater = (slime, pig) => {
    const level = slime.source.getLevel();
    const radius = 10;
    const { x, y, z } = slime.source.getPos();
    let scanBlock;
    let scannedBlocks = 0;
    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), [
      x + radius,
      y + radius,
      z + radius,
    ])) {
      scanBlock = level.getBlock(pos);
      if (scanBlock.id.equals("minecraft:air")) {
        level.setBlock(pos, "minecraft:water")
        scannedBlocks++;
      }
    }
    return 1;
  };