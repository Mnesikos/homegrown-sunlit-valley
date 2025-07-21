console.info("[SOCIETY] disableRestock.js loaded");

BlockEvents.rightClicked("numismatics:vendor", (e) => {
  if (e.item.id.includes("backpack")) e.cancel();
});
