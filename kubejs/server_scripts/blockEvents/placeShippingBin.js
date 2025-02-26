console.info("[SOCIETY] placeShippingBin.js loaded");

BlockEvents.placed(["shippingbin:smart_shipping_bin", "shippingbin:basic_shipping_bin"], (e) => {
  const playerUUID = e.player.getUuid().toString();
  let nbt = e.block.entityData;
  nbt.merge({ data: { owner: playerUUID } });
  e.block.setEntityData(nbt);
});
