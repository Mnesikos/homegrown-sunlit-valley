console.info("[SOCIETY] letsDoBroken.js loaded");

BlockEvents.broken("furniture:iron_fish_tank", (e) => {
  if (e.block.properties.get("part").toLowerCase() == "head") {
    e.block.popItem(Item.of("furniture:iron_fish_tank"));
  }
});

BlockEvents.broken("furniture:copper_fish_tank", (e) => {
  if (e.block.properties.get("part").toLowerCase() == "head") {
    e.block.popItem(Item.of("furniture:copper_fish_tank"));
  }
});

BlockEvents.broken("brewery:barrel_main", (e) => {
  if (e.block.properties.get("half").toLowerCase() == "upper") {
    e.block.popItem(Item.of("brewery:barrel_main"));
  }
});

BlockEvents.broken("brewery:barrel_right", (e) => {
  if (e.block.properties.get("half").toLowerCase() == "lower") {
    e.block.popItem(Item.of("brewery:barrel_main"));
  }
});

BlockEvents.broken(
  ["brewery:barrel_main_head", "brewery:barrel_head_right"],
  (e) => {
    e.block.popItem(Item.of("brewery:barrel_main"));
  }
);
