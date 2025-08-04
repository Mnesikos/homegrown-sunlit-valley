BlockEvents.rightClicked((e) => {
  const { item, block, server, player, level } = e;
  if (player.isHoldingInAnyHand("society:paw_carpet")) {
    let carpet = level.createEntity("society:paw_carpet");
    carpet.setPos(block.getX(), block.getY() + 1, block.getZ());
    carpet.spawn();
    server.runCommandSilent(
      `playsound minecraft:block.wool.place block @a ${block.x} ${block.y} ${block.z}`
    );
    if (!player.isCreative()) item.shrink(1);
  }
});
