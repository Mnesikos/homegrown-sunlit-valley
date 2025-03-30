console.info("[SOCIETY] registerCoinLeaderboardPlayers.js loaded");

PlayerEvents.loggedIn((e) => {
  if (!e.player.stages.has("coin_leaderboard")) {
    e.player.stages.add("coin_leaderboard");
    let playerList = e.server.persistentData.playerList;

    if (playerList == null) {
      playerList = {};
    }

    if (!playerList.hasOwnProperty(e.player.uuid)) {
      playerList[e.player.uuid] = e.player.name.string;
      e.server.persistentData.playerList = playerList;
    }
  }
});
