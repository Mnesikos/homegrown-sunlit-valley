console.info("[SOCIETY] placePrizeMachine.js loaded");

BlockEvents.placed("society:prize_machine", (e) => {
  const prizeNbt = e.player.getHeldItem("main_hand").getNbt();
  if (prizeNbt) {
    e.block.set(e.block.id, {
      facing: e.block.properties.get("facing"),
      prize: prizeNbt.get("prize"),
    });
  }
});
