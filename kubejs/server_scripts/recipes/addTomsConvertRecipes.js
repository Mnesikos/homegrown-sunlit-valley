console.info("[SOCIETY] addTomsConvertRecipes.js loaded");

ServerEvents.recipes((e) => {
  e.remove({ mod: "toms_storage" });

  // 4.0 TODO: Remove backwords compat
  e.shapeless("farm_and_charm:flour", ["create:wheat_flour"]);
  e.shapeless("refinedstorage:cable", ["toms_storage:ts.inventory_cable"]);
  e.shapeless("refinedstorage:cable", ["toms_storage:ts.inventory_cable_framed"]);
  e.shapeless("refinedstorage:cable", ["toms_storage:ts.inventory_proxy"]);
  e.shapeless("refinedstorage:external_storage", ["toms_storage:ts.inventory_cable_connector"]);
  e.shapeless("refinedstorage:external_storage", [
    "toms_storage:ts.inventory_cable_connector_filtered",
  ]);
  e.shapeless("refinedstorage:external_storage", [
    "toms_storage:ts.inventory_cable_connector_framed",
  ]);
  e.shapeless("refinedstorage:exporter", ["toms_storage:ts.inventory_hopper_basic"]);
  e.shapeless("refinedstorage:controller", ["toms_storage:ts.inventory_connector"]);
  e.shapeless("refinedstorage:crafting_grid", ["toms_storage:ts.storage_terminal"]);
  e.shapeless("refinedstorage:crafting_grid", ["toms_storage:ts.crafting_terminal"]);
  e.shapeless("refinedstorageaddons:wireless_crafting_grid", ["toms_storage:ts.wireless_terminal"]);
  e.shapeless("refinedstorage:detector", ["toms_storage:ts.level_emitter"]);
  e.shapeless("refinedstorage:filter", ["toms_storage:ts.item_filter"]);
  e.shapeless("refinedstorage:filter", ["toms_storage:ts.polymorphic_item_filter"]);
  e.shapeless("refinedstorage:filter", ["toms_storage:ts.tag_item_filter"]);

  e.shapeless("vinery:red_grapejuice", ["vinery:red_taiga_grapejuice"]);
  e.shapeless("vinery:red_grapejuice", ["vinery:red_jungle_grapejuice"]);
  e.shapeless("vinery:red_grapejuice", ["vinery:red_savanna_grapejuice"]);
  e.shapeless("vinery:white_grapejuice", ["vinery:white_taiga_grapejuice"]);
  e.shapeless("vinery:white_grapejuice", ["vinery:white_jungle_grapejuice"]);
  e.shapeless("vinery:white_grapejuice", ["vinery:white_savanna_grapejuice"]);
});
