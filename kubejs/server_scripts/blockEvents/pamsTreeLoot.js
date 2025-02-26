console.info("[SOCIETY] pamsTreeLoot.js loaded");

BlockEvents.rightClicked(
  [
    "pamhc2trees:pamapple",
    "pamhc2trees:pamcherry",
    "pamhc2trees:pamorange",
    "pamhc2trees:pampeach",
    "pamhc2trees:pamplum",
    "pamhc2trees:pamhazelnut",
    "pamhc2trees:pampawpaw",
    "pamhc2trees:pambanana",
    "pamhc2trees:pamcinnamon",
    "pamhc2trees:pamdragonfruit",
    "pamhc2trees:pammango",
    "pamhc2trees:pamstarfruit",
    "pamhc2trees:pamlychee",
  ],
  (e) => {
    const { block, player, server } = e;
    const fruitName = `${block.id.toString().split(":")[1]}`;
    if (Number(block.properties.get("age")) == 7) {
      server.runCommandSilent(
        `puffish_skills experience add ${player.username} society:farming 40`
      );
      player.stages.has("tree_whisperer") &&
        block.popItem(
          `2x pamhc2trees:${fruitName.substring(3, fruitName.length)}item`
        );
    }
  }
);
