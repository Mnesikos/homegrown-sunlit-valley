console.info("[SOCIETY] woodTapFix.js loaded");

BlockEvents.broken("treetap:tap", (e) => {
  if(e.level.getBlock(e.block.getPos().below()).id === "treetap:wooden_sap_collector") {
    e.block.popItemFromFace("meadow:wooden_bucket", "down");
  }
});
