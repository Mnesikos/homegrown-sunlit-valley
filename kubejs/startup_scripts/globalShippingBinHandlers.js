// Priority: 1000
const calculateQualityValue = (number, quality) => {
  let value;
  if (quality) {
    if (quality == 1.0) value = Math.round(number * 1.25);
    if (quality == 2.0) value = Math.round(number * 1.5);
    if (quality == 3.0) value = Math.round(number * 2);
  } else {
    value = number;
  }
  return value;
};
// Returns array of coins from price, prioritizing high value coins
const calculateCoinsFromValue = (price, output, coinMap) => {
  for (let i = 0; i < coinMap.length; i++) {
    let { coin, value } = coinMap[i];
    if (value <= price) {
      if (price % value === 0) {
        output.push({ coin: coin, count: price / value });
        return output;
      } else {
        output.push({ coin: coin, count: Math.floor(price / value) });
        calculateCoinsFromValue(price % value, output, coinMap);
      }
      return output;
    }
  }
};

global.processShippingBinInventory = (
  inventory,
  inventorySlots,
  attributes,
  stages,
  returnRemoved,
  simulated
) => {
  let calculatedValue = 0;
  let itemValue = 0;
  let removedItems = [];
  let slotItem;
  let isSellable;
  for (let i = 0; i < inventorySlots; i++) {
    slotItem = inventory.getStackInSlot(i).item;
    isSellable =
      global.trades.has(String(slotItem.id)) ||
      ["splendid_slimes:plort", "splendid_slimes:slime_heart"].includes(slotItem.id);
    if (isSellable) {
      let trade = global.trades.get(String(slotItem.id));
      let quality;
      let slotNbt;
      if (inventory.getStackInSlot(i).hasNBT()) {
        slotNbt = inventory.getStackInSlot(i).nbt;
      }
      if (slotNbt && ((slotNbt.slime && slotNbt.slime.id) || (slotNbt.plort && slotNbt.plort.id))) {
        if (slotNbt.slime) trade = global.trades.get(`${slotItem.id}/${slotNbt.slime.id}`);
        if (slotNbt.plort) trade = global.trades.get(`${slotItem.id}/${slotNbt.plort.id}`);
      }

      if (slotNbt && slotNbt.quality_food) {
        quality = slotNbt.quality_food.quality;
      }
      itemValue = calculateQualityValue(trade.value, quality);
      if (stages.has("bluegill_meridian") && slotItem.id == "aquaculture:bluegill") {
        itemValue = calculateQualityValue(666, quality);
      }
      if (
        stages.has("phenomenology_of_treasure") &&
        (Item.of(slotItem).hasTag("society:artifacts") ||
          Item.of(slotItem).hasTag("society:relics"))
      ) {
        itemValue *= 3;
      }
      if (
        stages.has("brine_and_punishment") &&
        Item.of(slotItem).hasTag("society:brine_and_punishment")
      ) {
        itemValue *= 2;
      }
      calculatedValue +=
        itemValue *
        inventory.getStackInSlot(i).count *
        (Number(
          attributes.filter((obj) => {
            return obj.Name === trade.multiplier;
          })[0]?.Base
        ) || 1);
    }
    if (isSellable && !simulated) {
      if (returnRemoved) removedItems.push(i);
      else inventory.setStackInSlot(i, "minecraft:air");
    }
  }
  return { calculatedValue: calculatedValue, removedItems: removedItems };
};

const debugValueProcess = false;

global.handleShippingBinDebt = (value, player, server, block, inventory, extenalOutput) => {
  let playerUUID = player.getUuid().toString();
  let binDebt = 0;
  let debtPaid;
  let totalDebt;
  let receipt;
  let newValue = value;
  if (!playerUUID) return newValue;
  if (server.persistentData.debts) {
    binDebt = server.persistentData.debts.filter((debt) => {
      return debt.uuid === playerUUID;
    });
  }
  if (binDebt.length > 0 && binDebt[0].amount > 0) {
    totalDebt = binDebt[0].amount;
    if (value >= totalDebt) {
      newValue = value - totalDebt;
      debtPaid = totalDebt;
      server.runCommandSilent(
        `immersivemessages sendcustom ${
          player.username
        } {anchor:7,background:1,color:"#FFFFFF",size:1,y:30,slideleft:1,slideoutleft:1,typewriter:1} 8 §aYou paid off your §f● §a${global.formatPrice(
          debtPaid
        )} debt!`
      );
      global.setDebt(server, playerUUID, 0);
    } else {
      debtPaid = value;
      newValue = 0;
      server.runCommandSilent(
        `immersivemessages sendcustom ${
          player.username
        } {anchor:7,background:1,color:"#FFFFFF",size:1,y:30,slideleft:1,slideoutleft:1,typewriter:1} 8 f● §6${global.formatPrice(
          debtPaid
        )} §7of your debt paid off...`
      );
      global.setDebt(server, playerUUID, totalDebt - debtPaid);
    }
  }
  if (debtPaid > 0) {
    receipt = Item.of(
      "candlelight:note_paper_written",
      `{author:"Sunlit Valley Hospital",text:[" Sunlit Valley Hospital

${player.username}, your profits were used to pay off your debt!

:coin: ${global.formatPrice(debtPaid)} paid out of your :coin: ${global.formatPrice(
        totalDebt
      )} debt."],title:"Debt Payment Receipt"}`
    );
    if (extenalOutput) {
      block.popItemFromFace(receipt, block.properties.get("facing"));
    } else {
      for (let j = 0; j < inventory.slots; j++) {
        if (inventory.getStackInSlot(j) === Item.of("minecraft:air")) {
          inventory.insertItem(j, receipt, false);
          break;
        }
      }
    }
  }
  return newValue;
};

// global.processValueOutput(value, slots, removedSlots, binPlayer, binPlayerUUID, binPlayer.server, block, inventory, false)
global.processValueOutput = (
  value,
  slots,
  removedSlots,
  player,
  server,
  block,
  inventory,
  extenalOutput
) => {
  if (value > 0) {
    let hasRoom = false;
    value = Math.round(
      global.handleShippingBinDebt(value, player, server, block, inventory, extenalOutput)
    );
    let outputs = calculateCoinsFromValue(value, [], extenalOutput ? global.coinMap : basicCoinMap);

    if (!outputs) outputs = [];

    if (debugValueProcess) {
      console.log(`slots: ${slots}`);
      console.log(`countNonEmpty: ${inventory.countNonEmpty()}`);
      console.log(`RemovedSlots: ${removedSlots.length}`);
      console.log(`calculateSlotsNeeded: ${calculateSlotsNeeded(outputs)}`);
    }
    hasRoom =
      extenalOutput ||
      slots - inventory.countNonEmpty() + removedSlots.length - calculateSlotsNeeded(outputs) >= 0;
    if (hasRoom) {
      if (!block.level.hasNeighborSignal(block.pos)) {
        server.runCommandSilent(
          `playsound etcetera:item.handbell.ring block @a ${player.x} ${player.y} ${player.z} 0.3`
        );
        server.runCommandSilent(
          `immersivemessages sendcustom ${
            player.username
          } {anchor:7,background:1,color:"#FFFFFF",size:1,y:30,slideleft:1,slideoutleft:1,typewriter:1} 8 ● §6${global.formatPrice(
            value
          )} §7worth of goods sold`
        );
      }
      if (extenalOutput) {
        let facing = block.properties.get("facing");
        outputs.forEach((output) => {
          let { coin, count } = output;
          for (let index = 0; index <= count; index += 64) {
            let difference = count - index;
            block.popItemFromFace(`${difference > 64 ? 64 : difference}x ${coin}`, facing);
          }
        });
      } else {
        /**
         * Basic Shipping Bins only remove items when they're sure there's enough room.
         * Smart Shipping Bins remove items upon calculation because they output externally.
         */
        for (let i = 0; i < removedSlots.length; i++) {
          inventory.setStackInSlot(removedSlots[i], "minecraft:air");
        }
        outputs.forEach((output) => {
          let { coin, count } = output;
          for (let index = 0; index <= count; index += 64) {
            let difference = count - index;
            for (let i = 0; i < slots; i++) {
              if (inventory.getStackInSlot(i).item.id === "minecraft:air") {
                inventory.setStackInSlot(
                  i,
                  Item.of(`${difference > 64 ? 64 : difference}x ${coin}`)
                );
                break;
              }
            }
          }
        });
      }
    }

    if (!hasRoom) {
      server.runCommandSilent(
        `playsound stardew_fishing:fish_escape block @a ${player.x} ${player.y} ${player.z} 0.3`
      );
      server.runCommandSilent(
        `immersivemessages sendcustom ${player.username} {anchor:7,background:1,color:"#FF5555",size:1,y:30,slideleft:1,slideoutleft:1,typewriter:1} 8 Your Basic Shipping Bin was too full to sell...`
      );
    }
  }
};
