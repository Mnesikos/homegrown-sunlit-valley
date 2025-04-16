console.info("[SOCIETY] addCommandAttributesOnRespawn.js loaded");

/**
 * Normally this behaivor would be handled buy Pufferfish Skills, but it's broken with shippingbin attributes
**/
CommonAddedEvents.playerRespawn((e) => {
  const { player, server } = e;
  const stages = player.stages;
  const attributeCommand = (type, mult) =>
  `attribute ${player.username} shippingbin:${type}_sell_multiplier base set ${mult}`
  
  if (stages.has("tiller")) server.runCommandSilent(attributeCommand("crop", 1.1));
  if (stages.has("artisan")) server.runCommandSilent(attributeCommand("wood", 1.2));
  if (stages.has("artful_tycoon")) server.runCommandSilent(attributeCommand("wood", 1.8));
  if (stages.has("gem_seller")) server.runCommandSilent(attributeCommand("gem", 1.5));
  if (stages.has("gem_tycoon")) server.runCommandSilent(attributeCommand("gem", 2));
  if (stages.has("fence")) server.runCommandSilent(attributeCommand("meat", 1.5));
  if (stages.has("looting_tycoon")) server.runCommandSilent(attributeCommand("meat", 2));
});
