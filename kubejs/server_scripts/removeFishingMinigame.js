console.info("[SOCIETY] removeFishingMinigame.js loaded");

// Replace true with false below if you want to remove the fishing minigame!
// If playing on a server, the server admin must do this.
const removeMinigame = false;

ServerEvents.tags("item", (e) => {
  if (removeMinigame) e.removeAll("stardew_fishing:starts_minigame");
});
