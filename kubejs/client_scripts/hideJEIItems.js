JEIEvents.hideItems((e) => {
  e.hide(global.removedItems);
  e.hide("minecraft:ancient_debris");
  const refinedBlocks = [
    "controller",
    "crafting_grid",
    "detector",
    "relay",
    "network_transmitter",
    "network_receiver",
    "wireless_transmitter",
    "security_manager",
  ];
  const colors = [
    "white",
    "orange",
    "magenta",
    "yellow",
    "lime",
    "pink",
    "gray",
    "light_gray",
    "cyan",
    "purple",
    "blue",
    "brown",
    "green",
    "red",
    "black",
  ];
  let hiddenRefinedStorageDyedItems = [];
  refinedBlocks.forEach((block) => {
    colors.forEach((color) => {
      hiddenRefinedStorageDyedItems.push(`refinedstorage:${color}_${block}`)
    })
  });
  e.hide(hiddenRefinedStorageDyedItems)
});
