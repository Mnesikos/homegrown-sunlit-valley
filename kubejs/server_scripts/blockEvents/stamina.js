// console.info("[SOCIETY] stamina.js loaded");

// const Stamina = Java.loadClass("tictim.paraglider.api.stamina.Stamina");
// const ParagliderAPI = Java.loadClass("tictim.paraglider.api.ParagliderAPI");

// const wateringCans = [
//   "dew_drop_watering_cans:copper_watering_can",
//   "dew_drop_watering_cans:gold_watering_can",
//   "dew_drop_watering_cans:iron_watering_can",
//   "dew_drop_watering_cans:diamond_watering_can",
//   "dew_drop_watering_cans:netherite_watering_can",
// ];

// BlockEvents.rightClicked((e) => {
//   const { player, item, block } = e;
//   if (
//     block.hasTag("dewdrop:waterable") &&
//     wateringCans.includes(item.getId()) &&
//     !(item.getDamageValue() >= item.getMaxDamage())
//   ) {
//     const staminaInstance = ParagliderAPI.staminaFactory()
//       .createServerInstance(player)
//       .get(player);
//     if (staminaInstance.isDepleted() || staminaInstance.stamina() <= 0) {
//       e.cancel();
//     } else {
//       let stamina = 400;
//       if (e.player.isCrouching()) stamina = 800;
//       staminaInstance.takeStamina(stamina, false, true);
//       if (staminaInstance.stamina() <= 0) staminaInstance.setDepleted(true);
//     }
//   }
// });
