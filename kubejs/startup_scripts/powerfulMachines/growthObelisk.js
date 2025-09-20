console.info("[SOCIETY] growthObelisk.js loaded");

// global.runGrowthObelisk = (tickEvent, artisanMachinePos, player, delay) => {
//   const { level, block, inventory } = tickEvent;
//   const server = level.server;
//   server.scheduleInTicks(delay, () => {
//     const artisanMachine = level.getBlock(artisanMachinePos);
//     const { x, y, z } = artisanMachine;
//     const currentStage = artisanMachine.properties.get("stage");
//     const upgraded = artisanMachine.properties.get("upgraded") == "true";
//     const loadedData = global.getArtisanMachineData(artisanMachine, upgraded, player.stages);
//     const season = global.getSeasonFromLevel(level);
//     const chargingRodOutput = Item.of(
//       `${upgraded && season === "winter" ? 3 : 1}x society:battery`
//     );
//     if (loadedData) {
//       const { recipes, stageCount, multipleInputs, hasTag, outputMult, soundType } = loadedData;
//       const hasInfinityWorm = artisanMachine.id === "society:deluxe_worm_farm" && upgraded;
//       let machineOutput;
//       let type;
//       let newProperties = artisanMachine.getProperties();
//       let recycleSparkstone;
//       if (
//         newProperties.get("mature").toLowerCase() === "true" &&
//         global.inventoryBelowHasRoom(
//           level,
//           block,
//           artisanMachine.id === "society:charging_rod"
//             ? chargingRodOutput
//             : global.getArtisanRecipe(recipes, artisanMachine).output[0]
//         ) &&
//         global.hasInventoryItems(inventory, "society:sparkstone", 1)
//       ) {
//         server.runCommandSilent(`playsound stardew_fishing:dwop block @a ${x} ${y} ${z}`);
//         if (artisanMachine.id === "society:charging_rod") {
//           machineOutput = chargingRodOutput;
//           artisanMachine.set(artisanMachine.id, {
//             working: false,
//             mature: false,
//             upgraded: upgraded,
//             stage: "0",
//           });
//         } else if (hasInfinityWorm) {
//           machineOutput = Item.of("4x crabbersdelight:deluxe_crab_trap_bait");
//           artisanMachine.set(artisanMachine.id, {
//             facing: artisanMachine.properties.get("facing"),
//             type: "1",
//             working: true,
//             mature: false,
//             upgraded: upgraded,
//             stage: "0",
//           });
//         } else {
//           if (newProperties.get("type")) type = Number(newProperties.get("type"));
//           machineOutput = global.artisanHarvest(
//             artisanMachine,
//             recipes,
//             stageCount,
//             outputMult,
//             artisanMachine.id === "society:cheese_press",
//             true
//           );
//         }

//         if (machineOutput) {
//           recycleSparkstone = global.checkSparkstoneRecyclers(level, block);
//           if (
//             artisanMachine.id === "society:dehydrator" &&
//             upgraded &&
//             global.dehydratableMushroomOutputs.includes(machineOutput.id)
//           ) {
//             machineOutput.count = 2;
//           }
//           if (artisanMachineCanHaveAdditionalOutput.includes(artisanMachine.id)) {
//             global.handleAdditionalArtisanMachineOutputs(
//               level,
//               block,
//               artisanMachine,
//               recipes,
//               type,
//               upgraded,
//               player.stages
//             );
//           }
//           let sparkstoneSaveChance = 0;
//           if (player.stages.has("slouching_towards_artistry")) {
//             sparkstoneSaveChance = Number(currentStage) * 0.05;
//           }
//           if (!recycleSparkstone && Math.random() > sparkstoneSaveChance) {
//             global.useInventoryItems(inventory, "society:sparkstone", 1);
//           } else {
//             level.spawnParticles(
//               "species:youth_potion",
//               true,
//               x,
//               y + 0.5,
//               z,
//               0.1 * rnd(1, 4),
//               0.1 * rnd(1, 4),
//               0.1 * rnd(1, 4),
//               5,
//               0.01
//             );
//           }
//           let specialItemResultCode = global.insertBelow(level, block, machineOutput);
//           if (specialItemResultCode == 1) {
//             level.spawnParticles(
//               "species:ascending_dust",
//               true,
//               x,
//               y + 1,
//               z,
//               0.2 * rnd(1, 1.5),
//               0.2 * rnd(1, 1.5),
//               0.2 * rnd(1, 1.5),
//               3,
//               0.01
//             );
//           }
//         }
//       }

//       const abovePos = block.getPos().above();
//       const aboveBlock = level.getBlock(abovePos.x, abovePos.y, abovePos.z);

//       if (
//         recipes &&
//         newProperties.get("working").toLowerCase() === "false" &&
//         global.hasInventoryItems(inventory, "society:sparkstone", 1) &&
//         aboveBlock.inventory &&
//         !aboveBlock.inventory.isEmpty()
//       ) {
//         const slots = aboveBlock.inventory.getSlots();
//         let slotStack;
//         let outputCount;
//         for (let i = 0; i < slots; i++) {
//           slotStack = aboveBlock.inventory.getStackInSlot(i);
//           if (!(multipleInputs && slotStack.count <= 1)) {
//             outputCount = global.artisanInsert(
//               artisanMachine,
//               slotStack,
//               level,
//               recipes,
//               stageCount,
//               soundType,
//               multipleInputs,
//               hasTag,
//               true,
//               server
//             );
//             if (outputCount > 0) {
//               recycleSparkstone = global.checkSparkstoneRecyclers(level, block);
//               if (!recycleSparkstone) global.useInventoryItems(inventory, "society:sparkstone", 1);
//               else {
//                 level.spawnParticles(
//                   "species:youth_potion",
//                   true,
//                   x,
//                   y + 0.5,
//                   z,
//                   0.1 * rnd(1, 4),
//                   0.1 * rnd(1, 4),
//                   0.1 * rnd(1, 4),
//                   5,
//                   0.01
//                 );
//               }
//               level.runCommandSilent(`playsound create:fwoomp block @a ${x} ${y} ${z} 0.8`);
//               aboveBlock.inventory.extractItem(i, outputCount, false);
//               break;
//             }
//           }
//         }
//       }
//       if (hasInfinityWorm && newProperties.get("working").toLowerCase() === "false") {
//         artisanMachine.set(artisanMachine.id, {
//           facing: artisanMachine.properties.get("facing"),
//           type: "1",
//           working: true,
//           mature: false,
//           upgraded: upgraded,
//           stage: "0",
//         });
//       }
//     }
//   });
// };

// global.artisanHopperScan = (entity, radius) => {
//   const { block, level } = entity;
//   const { x, y, z } = block;
//   let attachedPlayer;
//   level.getServer().players.forEach((p) => {
//     if (p.getUuid().toString() === block.getEntityData().data.owner) {
//       attachedPlayer = p;
//     }
//   });
//   if (attachedPlayer) {
//     let scanBlock;
//     let scannedBlocks = 0;
//     for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), [
//       x + radius,
//       y + radius,
//       z + radius,
//     ])) {
//       scanBlock = level.getBlock(pos);
//       if (scanBlock.hasTag("society:artisan_machine")) {
//         global.runArtisanHopper(entity, pos.immutable(), attachedPlayer, scannedBlocks * 5);
//         scannedBlocks++;
//       }
//     }
//   }
// };

const CropGrowthUtils = Java.loadClass("cool.bot.dewdropfarmland.utils.CropHandlerUtils");
const RandomSource = Java.loadClass("net.minecraft.util.RandomSource");

global.runGrowthObelisk = (tickEvent) => {
  const { level, block, inventory } = tickEvent;
  const { x, y, z } = block;
  const server = level.server;
  let dayTime = level.dayTime();
  let morningModulo = dayTime % 24000;
  const goldenClockProgTime = 1000;
  level.spawnParticles("snowyspirit:glow_light", true, x + 0.5, y + 1.3, z + 0.5, 0, 0, 0, 2, 2);
  if (
    morningModulo >= goldenClockProgTime &&
    morningModulo < goldenClockProgTime + artMachineTickRate
  ) {
    level.spawnParticles("species:ghoul_searching", true, x + 0.5, y, z + 0.5, 0, 0, 0, 1, 2);
    server.runCommandSilent(`playsound ribbits:entity.ribbit.magic block @a ${x} ${y} ${z} 1`);
    server.scheduleInTicks(4, () => {
      CropGrowthUtils.growCropsInRadius(level, block.getPos(), RandomSource.create(), 4);
    });
  }
};

StartupEvents.registry("block", (event) => {
  event
    .create("society:growth_obelisk", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Grows crops by one stage once a day at 7am"));
      item.tooltip(Text.green(`Area: 7x1x7`));
      item.tooltip(Text.lightPurple("Requires Spark-Gro each day"));
      item.modelJson({
        parent: "society:block/growth_obelisk/display",
      });
    })
    .soundType("copper")
    .model("society:block/growth_obelisk/lower")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 2);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(artMachineTickRate, 0, (entity) => {
        global.runGrowthObelisk(entity, 3);
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .insertItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.insertItem(slot, stack, simulate)
          )
          .extractItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.extractItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) => blockEntity.inventory.getSlotLimit(slot))
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) => blockEntity.inventory.getStackInSlot(slot))
      );
    });
  event
    .create("society:growth_obelisk_upper")
    .box(4, 0, 4, 12, 9, 12)
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .defaultCutout()
    .model("society:block/growth_obelisk/upper");
});
