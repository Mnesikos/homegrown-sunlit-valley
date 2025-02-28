console.info("[SOCIETY] disableQuarkMysticalFlowers.js loaded");

BlockEvents.rightClicked((e) => {
  if (e.block.hasTag("botania:mystical_flowers")) {
    e.cancel();
  }
});
