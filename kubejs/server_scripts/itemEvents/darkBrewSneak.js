console.info("[SOCIETY] darkBrewSneak.js loaded");

ItemEvents.rightClicked("brewery:dark_brew", e => {
  if (!e.player.isCrouching()) e.cancel()
});
