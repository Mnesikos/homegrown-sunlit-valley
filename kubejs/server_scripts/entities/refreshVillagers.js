console.info("[SOCIETY] refreshVillagers.js loaded");

ItemEvents.entityInteracted((e) => {
  const { hand, player, level, target, server } = e;
  if (hand == "OFF_HAND") return;
  if (target.type !== "minecraft:villager") return;
  let updateThis = false;
  const nbt = target.nbt.toString();
  if (nbt.includes("shepherd") && !nbt.includes("slime_incubator")) updateThis = true;
  if (nbt.includes("botanist") && !nbt.includes("cornucopia")) updateThis = true;
  if (nbt.includes("cook") && nbt.includes("veggiesdelight:sweet_potato")) updateThis = true;
  if (updateThis) {
    let freshVillager = level.createEntity("minecraft:villager");
    let villagerNbt = freshVillager.getNbt();
    villagerNbt.VillagerData.profession = target.nbt.VillagerData.profession;
    villagerNbt.Brain.memories = target.nbt.Brain.memories;
    freshVillager.customName = target.customName;
    villagerNbt.Pos = [Number(target.x), Number(target.y), Number(target.z)];
    freshVillager.setNbt(villagerNbt);
    freshVillager.spawn();
    target.setRemoved("unloaded_to_chunk");
    server.runCommandSilent(
      `playsound stardew_fishing:complete block @a ${player.x} ${player.y} ${player.z}`
    );
    player.tell(
      Text.green("Villager updated! Thanks for playing Capital Hill!")
    );
  }
});
