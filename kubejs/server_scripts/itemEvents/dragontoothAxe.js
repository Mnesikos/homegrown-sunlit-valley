console.info("[SOCIETY] dragontoothAxe.js loaded");
const breakAxe = (item, server, player) => {
  if (
    item.id === "society:dragontooth_axe" &&
    !player.stages.has("dragonslayer")
  ) {
    item.count--;
    server.runCommandSilent(
      `playsound minecraft:entity.warden.sonic_boom block @a ${player.x} ${player.y} ${player.z}`
    );
    server.runCommandSilent(
      `immersivemessages sendcustom ${player.username} {anchor:3,background:1,wrap:1,align:0,color:"#FF5555",y:-60} 12 Your Dragontooth Axe broke, only a Dragonslayer can wield it...`
    );
  }
};

ItemEvents.firstLeftClicked((e) => {
  const { hand, item, player, server } = e;
  if (hand == "OFF_HAND") return;
  if (hand == "MAIN_HAND") breakAxe(item, server, player);
});

BlockEvents.leftClicked((e) => {
  const { hand, item, player, server } = e;
  if (hand == "OFF_HAND") return;
  if (hand == "MAIN_HAND") breakAxe(item, server, player);
});
