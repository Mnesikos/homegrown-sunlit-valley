console.info("[SOCIETY] smokeTubasmokeStick.js loaded");

const endlessEntranaTemplate =
  '{anchor:3,background:1,wrap:1,align:0,color:"#00AAAA",y:-60}';
ItemEvents.rightClicked("society:tubasmoke_stick", (e) => {
  const { server, player, item, hand, level } = e;
  player.damageHeldItem(hand, 1);
  server.runCommandSilent(
    `playsound minecraft:item.flintandsteel.use block @a ${player.x} ${player.y} ${player.z}`
  );

  item.count--;
  level.spawnParticles(
    "farmersdelight:steam",
    true,
    player.x,
    player.y + 1,
    player.z,
    0.1 * rnd(1, 6),
    0.1 * rnd(1, 4),
    0.1 * rnd(1, 4),
    22,
    0.001
  );
  server.runCommandSilent(
    `playsound supplementaries:block.cannon.ignite block @a ${player.x} ${player.y} ${player.z}`
  );
  server.runCommandSilent(
    `effect give ${player.username} minecraft:slowness 20 1`
  );
  if (Math.random() < 0.02) {
    server.runCommandSilent(
      `execute in ${level.dimension} run summon lightning_bolt ${player.x} ${player.y} ${player.z}`
    );
    server.runCommandSilent(
      `immersivemessages sendcustom ${player.username} {anchor:3,shake:1,background:1,wrap:1,align:0,color:"#FF5555",y:-60} 5 Smoking kills...`
    );
  }
  if (Math.random() < 0.01 && !item.nbt) {
    server.runCommandSilent(
      `playsound tanukidecor:block.cash_register.ring block @a ${player.x} ${player.y} ${player.z}`
    );
    server.runCommandSilent(
      `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 What's this...?`
    );
    server.scheduleInTicks(1, () => {
      player.give(
        Item.of(
          "society:tubasmoke_stick",
          '{edition:1,display:{Name:\'{"bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"#FFFFFF","extra":[{"bold":false,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"white","text":"® "},{"bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"dark_aqua","text":"Green"}],"text":"[1] Entrana"}\'}}'
        )
      );
    });
  }
  if (item.nbt && item.nbt.edition) {
    let giveNew = true;
    if (item.nbt.edition === 500)
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 This is only the beginning...`
      );
    if (item.nbt.edition === 650) {
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 It would be dangerous to go any further...`
      );
    }
    if (item.nbt.edition === 666) {
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 You were warned...`
      );
      server.scheduleInTicks(100, () => {
        server.runCommandSilent(`kill ${player.username}`);
      });
    }

    if (item.nbt.edition === 999) {
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 20 On April 14th, 1912, the famous ocean liner, known as the Titanic crashed into an iceberg. After remaining afloat for two hours and forty minutes, it sank between the waters of the North Atlantic. I will give you more time. Nine Hours. That is the time you will be given to make your escape.`
      );
      server.scheduleInTicks(648000, () => {
        server.runCommandSilent(`kill ${player.username}`);
      });
    }

    if (item.nbt.edition === 2000) {
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 You have a long road ahead...`
      );
    }

    if (item.nbt.edition === 2100) {
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 But there's a prize at the end`
      );
    }
    if (item.nbt.edition === 5000) {
      player.give("numismatics:spur");
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 There's more where that came from!`
      );
    }
    if (item.nbt.edition > 10000 && Math.random() < 0.001) {
      player.give("numismatics:bevel");
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 Unlimited money comes to those that smoke Entrana Greens...`
      );
    }
    if (item.nbt.edition > 10000 && Math.random() < 0.001) {
      player.give("numismatics:sprocket");
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 Unlimited money comes to those that smoke Entrana Greens...`
      );
    }
    if (item.nbt.edition > 1000000000 && Math.random() < 0.0001) {
      if (player.offHandItem === "numismatics:prismatic_coin") {
        player.give("create:creative_blaze_cake");
        player.offHandItem.count--;
        server.runCommandSilent(
          `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 Thank you for your patronage...`
        );
        giveNew = false;
      } else {
        server.runCommandSilent(
          `immersivemessages sendcustom ${player.username} ${endlessEntranaTemplate} 5 Place a Prismatic Coin in your offhand as an offering while smoking... Maybe it will be recognized...`
        );
      }
    }
    if (giveNew) {
      server.scheduleInTicks(1, () => {
        player.give(
          Item.of(
            "society:tubasmoke_stick",
            `{edition:${String(
              item.nbt.edition + 1
            )},display:{Name:'{"bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"#FFFFFF","extra":[{"bold":false,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"white","text":"® "},{"bold":true,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false,"color":"dark_aqua","text":"Green"}],"text":"[${String(
              item.nbt.edition + 1
            )}] Entrana"}'}}`
          )
        );
      });
    }
  }
  if (Math.random() < 0.01) {
    server.scheduleInTicks(800, () => {
      server.runCommandSilent(
        `effect give ${player.username} minecraft:wither 40 3`
      );
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} {anchor:3,shake:1,background:1,wrap:1,align:0,color:"#FF5555",y:-60} 5 Smoking kills...`
      );
    });
  }
  player.addItemCooldown(item, 10);
});
