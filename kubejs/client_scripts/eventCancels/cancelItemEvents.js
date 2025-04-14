console.info("[SOCIETY] cancelItemEvents.js loaded");

ItemEvents.rightClicked("brewery:dark_brew", e => {
  if (!e.player.isCrouching()) e.cancel()
});

ItemEvents.rightClicked('farm_and_charm:fertilizer', e => {
  e.cancel()
});
