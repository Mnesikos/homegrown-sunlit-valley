console.info("[SOCIETY] animalPet.js loaded");

const petGifts = new Map([
  ["buzzier_bees:grizzly_bear", ["society:beemonican_seal"]],
  ["legendarycreatures:ender_wisp", ['simplehats:pika_ears']],
  ["minecraft:wolf", ["simplehats:longfoxears", "betterarcheology:wolf_fossil"]],
  ["minecraft:cat", ["simplehats:nekoears", "betterarcheology:ocelot_fossil"]],
  ["quark:foxhound", ['simplehats:fireworks',]],
  ["quark:shiba", ["simplehats:eevee_ears"]],
  ["minecraft:allay", ['simplehats:chi_ears']],
  ["minecraft:horse", ["relics:horse_flute"]],
  ["minecraft:polar_bear", ['simplehats:teddy_bear']],
  ["hamsters:hamster", ["society:tiny_gnome"]]
]);

ItemEvents.entityInteracted((e) => {
  const { hand, player, level, target, server } = e;
  if (hand == "OFF_HAND") return;
  if (!global.checkEntityTag(target, "society:pet_animal")) return;
  if (hand == "MAIN_HAND") {
    const data = target.persistentData;
    let possibleGifts
    let gift = level.createEntity("minecraft:item");
    
    if (!data.gifted && data.affection >= 1000) {
      const nonIdType = String(target.type.split(":")[1]).replace(/_/g, " ");
      const name = target.customName ? target.customName.getString() : undefined;
      const capitalizedType = nonIdType.charAt(0).toUpperCase() + nonIdType.slice(1);
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} {anchor:3,background:1,wrap:1,align:0,color:"#55FF55",y:-90} 4 ${
          name ? name : capitalizedType
        } really loves you!`
      );
      possibleGifts = petGifts.get(`${target.type}`)
      data.gifted = true
      gift.x = player.x;
      gift.y = player.y;
      gift.z = player.z;
      gift.item = Item.of(possibleGifts[rnd(0, possibleGifts.length - 1)]);
      gift.spawn();
      level.spawnParticles(
        "minecraft:heart",
        true,
        target.x,
        target.y + 1.5,
        target.z,
        0.2 * rnd(0, 3),
        0.2 * rnd(0, 3),
        0.2 * rnd(0, 3),
        20,
        0.01
      );
    }
  }
});
