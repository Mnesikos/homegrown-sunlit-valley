console.info("[SOCIETY] checkSkullCavernLogin.js loaded");

PlayerEvents.loggedIn((e) => {
  const { player, level, server } = e;
  if (level.dimension === "society:skull_cavern") {
    const chunkDay =
      level.persistentData.chunkParityMap[level.getChunkAt(player.getPos()).pos.toString()].day;
      
    if (Number(chunkDay) > Number(player.persistentData.skullCavernEnterDay)) {
      player.persistentData.skullCavernEnterDay = -1;
      global.teleportHome(player, server, player.level);
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} {anchor:3,background:1,wrap:1,align:0,color:"#AAAAAA",y:-60} 10 You fainted in the Skull Cavern...`
      );
      player.potionEffects.add("minecraft:slowness", 310, 3, true, false);
      player.potionEffects.add("minecraft:darkness", 310, 0, true, false);
      if (global.enableDeathDebt) global.handleFee(server, player, "skull_cavern");
    }
  }
});
