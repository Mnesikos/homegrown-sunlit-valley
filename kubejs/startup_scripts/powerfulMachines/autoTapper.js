console.info("[SOCIETY] autoTapper.js loaded");

const $ForgeHooks = Java.loadClass("net.minecraftforge.common.ForgeHooks");

StartupEvents.registry("block", (event) => {
  event
    .create("society:auto_tapper", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(Text.gray("Collects Tapper resources automatically."));
      item.tooltip(
        Text.gray("Stores tapped fluid in its tank to be pumped out.")
      );
      item.modelJson({
        parent: "society:block/auto_tapper",
      });
    })
    .model("society:block/auto_tapper")
    .blockEntity((blockInfo) => {
      blockInfo.initialData({ Fluid: 0, FluidType: "" });
      blockInfo.serverTick(200, 0, (entity) => {
        global.steamGeneratorServerTick(entity);
      });
      blockInfo.attachCapability(
        CapabilityBuilder.FLUID.customBlockEntity()
          .getCapacity(() => 10000)
          .getFluid((blockInfo, fl) => {
            const foundFluid = blockInfo.persistentData.getInt("FluidType");
            if (!foundFluid) return Fluid.of("minecraft:water", 1000);
            return Fluid.of(
              foundFluid,
              blockInfo.persistentData.getInt("Fluid")
            );
          })
          .onFill((blockInfo, fluid, sim) => {
            const fluidData = blockInfo.persistentData.getInt("Fluid");
            const filled = Math.min(10000 - fluidData, fluid.getAmount());
            if (!sim) {
              console.log(fluid.getFluidStack())
              console.log(fluid.getFluid())
              blockInfo.persistentData.putString("FluidType", "society:pine_tar");
              blockInfo.persistentData.putInt("Fluid", fluidData + filled);
            }
            return filled;
          })
          .onDrain((be, fluid) => {
            return fluid.getAmount();
          })
          .availableOn((blockInfo, dir) => {
            if (!dir) return false;
            return dir.toString() == "down";
          })
      );
    });
});
// .onFill((blockInfo, fluid, sim) => {
//   const fluidData = blockInfo.persistentData.getInt("Fluid");
//   const filled = Math.min(10000 - fluidData, fluid.getAmount());
//   if (!sim)
//     blockInfo.persistentData.putInt("Fluid", fluidData + filled);
//   return filled;
// })
// .onDrain((blockInfo, fluid, sim) => {
//   const fluidData = blockInfo.persistentData.getInt("Fluid");
//   const drained = Math.min(fluidData, fluid.getAmount());
//   if (!sim)
//     blockInfo.persistentData.putInt("Fluid", fluidData - drained);
//   return drained;
// })
/**
 *
 * @param {Internal.BlockEntityJS} be
 */
global.steamGeneratorServerTick = (blockInfo) => {
  const { block } = blockInfo;

  console.log("yeet");
  const fluidHandler = blockInfo
    .getCapability(ForgeCapabilities.FLUID_HANDLER)
    .orElse(null);
  const blockData = blockInfo.persistentData;
  console.log("yoot");
  console.log(blockData);
  console.log(fluidHandler.getFluidInTank(0));
  blockData.putString("FluidType", "society:pine_tar");
  fluidHandler.fill(Fluid.of("society:pine_tar", 10), "execute");
};
// StartupEvents.registry("block", (event) => {
//   event
//     .create("arcanica:steam_generator", "cardinal")
//     .blockEntity((be) => {
//       be.serverTick(1, 0, (be) => {
//         global.steamGeneratorServerTick(be);
//       });
//       be.inventory(9, 1);
//       be.rightClickOpensInventory();
//       be.attachCapability(
//         CapabilityBuilder.ENERGY.customBlockEntity()
//           .withCapacity(10000)
//           .canExtract(() => true)
//           .canReceive(() => true)
//           .extractEnergy((be, amount, sim) => {
//             let energy = be.persistentData.getInt("Energy");
//             let extracted = Math.min(energy, amount);
//             if (!sim) be.persistentData.putInt("Energy", energy - extracted);
//             return extracted;
//           })
//           .receiveEnergy((be, amount, sim) => {
//             let energy = be.persistentData.getInt("Energy");
//             let received = Math.min(10000 - energy, amount);
//             if (!sim) be.persistentData.putInt("Energy", energy + received);
//             return received;
//           })
//           .getEnergyStored((be) => be.persistentData.getInt("Energy"))
//           .getMaxEnergyStored(() => 10000)
//       );
//       be.attachCapability(
//         CapabilityBuilder.FLUID.customBlockEntity()
//           .getCapacity(() => 10000)
//           .getFluid((be, fl) => {
//             return Fluid.of("water", be.persistentData.getInt("Water"));
//           })
//           .onFill((be, fluid, sim) => {
//             let water = be.persistentData.getInt("Water");
//             let filled = Math.min(10000 - water, fluid.getAmount());
//             if (!sim) be.persistentData.putInt("Water", water + filled);
//             return filled;
//           })
//           .onDrain((be, fluid, sim) => {
//             let water = be.persistentData.getInt("Water");
//             let drained = Math.min(water, fluid.getAmount());
//             if (!sim) be.persistentData.putInt("Water", water - drained);
//             return drained;
//           })
//           .availableOn((be, dir) => {
//             return dir =
//           })
//       );
//     })
//     .displayName("Rudimentary Steam Turbine");
// });

// /**
//  *
//  * @param {Internal.BlockEntityJS} be
//  */
// global.steamGeneratorServerTick = function (be) {
//   let e = be.getCapability(ForgeCapabilities.ENERGY).orElse(null);
//   let f = be.getCapability(ForgeCapabilities.FLUID_HANDLER).orElse(null);

//   let invItems = be.inventory.allItems;
//   if (
//     invItems.some((item) => {
//       let burnTime = $ForgeHooks.getBurnTime(item, "smelting");
//       console.log(burnTime);
//       return burnTime != null && burnTime != -1 && burnTime > 0;
//     })
//   ) {
//     let burnTime = be.persistentData.getInt("RemainingBurnTime");
//     if (burnTime < 1) {
//       let burnableItem = invItems.find(
//         (item) => $ForgeHooks.getBurnTime(item, "smelting") > 0
//       );
//       be.persistentData.putInt(
//         "RemainingBurnTime",
//         $ForgeHooks.getBurnTime(burnableItem, "smelting")
//       );
//       let slot = be.inventory.find(burnableItem.asIngredient());
//       be.inventory.extractItem(slot, 1, false);
//     }
//   }
//   if (be.persistentData.getInt("RemainingBurnTime") > 0)
//     be.persistentData.putInt(
//       "RemainingBurnTime",
//       be.persistentData.getInt("RemainingBurnTime") - 1
//     );
//   else return;

//   if (f.getFluidInTank(0).amount > 0) {
//     e.receiveEnergy(3, false);
//     f.drain(Fluid.of("water", 1), "execute");
//   }
//   if (
//     be.block.down.entity &&
//     be.block.down.entity.getCapability(ForgeCapabilities.ENERGY)
//   ) {
//     let down = be.block.down.entity
//       .getCapability(ForgeCapabilities.ENERGY)
//       .orElse(null);
//     let extracted = e.extractEnergy(3, true);
//     let received = down.receiveEnergy(extracted, true);
//     e.extractEnergy(received, false);
//     down.receiveEnergy(received, false);
//   }
// };
StartupEvents.registry("block", (event) => {
  event.create("arcanica:steam_generator").blockEntity((be) => {
    be.serverTick(1, 0, (be) => {
      global.steamGeneratorServerTickTw(be);
    });
    be.attachCapability(
      CapabilityBuilder.ENERGY.customBlockEntity().withCapacity(10000)
    );
    be.attachCapability(
      CapabilityBuilder.FLUID.customBlockEntity()
        .getCapacity(() => 10000)
        .onFill((be, fluid) => {
          return fluid.getAmount();
        })
        .onDrain((be, fluid) => {
          return fluid.getAmount();
        })
    );
  });
});

/**
 *
 * @param {Internal.BlockEntityJS} be
 */
global.steamGeneratorServerTickTw = function (be) {
  let e = be.getCapability(ForgeCapabilities.ENERGY).orElse(null);
  let f = be.getCapability(ForgeCapabilities.FLUID_HANDLER).orElse(null);
  console.log(e.getEnergyStored());
  console.log(f.getFluidInTank(0).getAmount());
};
