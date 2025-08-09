ServerEvents.commandRegistry((event) => {
  const { commands: Commands } = event;

  event.register(Commands.literal("weeping").executes((c) => global.weepingWater(c)));
});
global.weepingWater = (slime, pig) => {
  const executor = slime.source.entity;
  const level = executor.getLevel();
  const radius = 10.0;
  const location = executor.getPos();
  const x = Number(location.x);
  const y = Number(location.y);
  const z = Number(location.z);
  let scanBlock;
  let scannedBlocks = 0;
  executor.tell(radius);
  executor.tell(x);
  executor.tell(x - radius);  
  executor.tell(new BlockPos(x - radius, y - radius, z - radius));
  for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), [
    x + radius,
    y + radius,
    z + radius,
  ])) {
    executor.tell(pos);
    scanBlock = level.getBlock(pos);
    if (scanBlock.id.equals("minecraft:air")) {
      scanBlock.set("minecraft:water");
      scannedBlocks++;
    }
  }
  return 1;
};
