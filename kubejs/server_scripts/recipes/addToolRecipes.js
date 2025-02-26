console.info("[SOCIETY] addToolRecipes.js loaded");

ServerEvents.recipes((e) => {
  const shapeTemplate = ["cmc", "cTc", "ccc"];
  const toolTypes = ["pickaxe", "shovel", "hoe", "sword", "axe"];
  const armorTypes = ["helmet", "chestplate", "leggings", "boots"];

  const upgradeTool = (type, modId, armor) => {
    if (!armor) {
      if (type !== "watering_can") {
        e.shaped(`${modId}:stone_${type}`, shapeTemplate, {
          T: Item.of(`${modId}:wooden_${type}`),
          m: "minecraft:cobblestone",
          c: "numismatics:bevel",
        }).modifyResult((grid, result) => {
          let item = grid.find(Item.of(`${modId}:wooden_${type}`));
          return result.withNBT(item.nbt);
        });
        e.shaped(`${modId}:iron_${type}`, shapeTemplate, {
          T: Item.of(`${modId}:stone_${type}`),
          m: "minecraft:iron_ingot",
          c: "numismatics:sprocket",
        }).modifyResult((grid, result) => {
          let item = grid.find(Item.of(`${modId}:stone_${type}`));
          return result.withNBT(item.nbt);
        });
      }
      e.shaped(
        `${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`,
        shapeTemplate,
        {
          T: Item.of(`${modId}:iron_${type}`),
          m: "minecraft:gold_ingot",
          c: "numismatics:cog",
        }
      ).modifyResult((grid, result) => {
        let item = grid.find(Item.of(`${modId}:iron_${type}`));
        return result.withNBT(item.nbt);
      });
    } else {
      e.shaped(`${modId}:chainmail_${type}`, shapeTemplate, {
        T: Item.of(`${modId}:leather_${type}`),
        m: "minecraft:chain",
        c: "numismatics:bevel",
      }).modifyResult((grid, result) => {
        let item = grid.find(Item.of(`${modId}:leather_${type}`));
        return result.withNBT(item.nbt);
      });
      e.shaped(`${modId}:iron_${type}`, shapeTemplate, {
        T: Item.of(`${modId}:chainmail_${type}`),
        m: "minecraft:iron_ingot",
        c: "numismatics:sprocket",
      }).modifyResult((grid, result) => {
        let item = grid.find(Item.of(`${modId}:chainmail_${type}`));
        return result.withNBT(item.nbt);
      });
      e.shaped(
        `${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`,
        shapeTemplate,
        {
          T: Item.of(`${modId}:iron_${type}`),
          m: "minecraft:gold_ingot",
          c: "numismatics:cog",
        }
      ).modifyResult((grid, result) => {
        let item = grid.find(Item.of(`${modId}:iron_${type}`));
        return result.withNBT(item.nbt);
      });
    }
    e.shaped(`${modId}:diamond_${type}`, shapeTemplate, {
      T: Item.of(`${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`),
      m: "minecraft:diamond",
      c: "numismatics:crown",
    }).modifyResult((grid, result) => {
      let item = grid.find(
        Item.of(`${modId}:gold${modId === "minecraft" ? "en" : ""}_${type}`)
      );
      return result.withNBT(item.nbt);
    });
    if (modId !== "aquaculture") {
      e.shaped(`${modId}:netherite_${type}`, ["cmc", "cTc", "csc"], {
        T: Item.of(`${modId}:diamond_${type}`),
        m: "minecraft:netherite_ingot",
        c: "numismatics:sun",
        s: "minecraft:netherite_upgrade_smithing_template",
      }).modifyResult((grid, result) => {
        let item = grid.find(Item.of(`${modId}:diamond_${type}`));
        return result.withNBT(item.nbt);
      });
    }
  };
  const manasteelUpgrades = (type) => {
    e.shaped(`botania:manasteel_${type}`, ["cmc", "cTc", "ccc"], {
      T: Item.of(`minecraft:diamond_${type}`),
      m: "botania:manasteel_ingot",
      c: "numismatics:sun",
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`minecraft:diamond_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  const elementiumUpgrades = (type) => {
    e.shaped(`botania:elementium_${type}`, ["cmc", "mTm", " m "], {
      T: Item.of(`botania:manasteel_${type}`),
      m: "botania:elementium_ingot",
      c: "society:botanical_tribute",
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`botania:manasteel_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  const runes = ["spring", "summer", "fall", "winter"];
  const terrasteelUpgrades = (type, runeIndex) => {
    e.shaped(`botania:terrasteel_${type}`, ["crc", "mTm", "cmc"], {
      T: Item.of(`botania:manasteel_${type}`),
      m: "botania:terrasteel_ingot",
      c: "society:botanical_tribute",
      r: `botania:rune_${runes[runeIndex]}`,
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`botania:manasteel_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  const neptuniumUpgrades = (type) => {
    e.shaped(`aquaculture:neptunium_${type}`, ["cmc", "cTc", "ccc"], {
      T: Item.of(`minecraft:diamond_${type}`),
      m: "aquaculture:neptunium_ingot",
      c: "numismatics:sun",
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`minecraft:diamond_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  toolTypes.forEach((type) => {
    upgradeTool(type, "minecraft");
    neptuniumUpgrades(type);
  });
  armorTypes.forEach((type, index) => {
    upgradeTool(type, "minecraft", true);
    neptuniumUpgrades(type);
    manasteelUpgrades(type);
    elementiumUpgrades(type);
    terrasteelUpgrades(type, index);
  });
  e.shaped(`aquaculture:neptunium_bow`, ["cmc", "cTc", "ccc"], {
    T: Item.of(`minecraft:bow`),
    m: "aquaculture:neptunium_ingot",
    c: "numismatics:sun",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`minecraft:bow`));
    return result.withNBT(item.nbt);
  });
  upgradeTool("fillet_knife", "aquaculture");
  e.shaped(`aquaculture:neptunium_fillet_knife`, ["cmc", "cTc", "ccc"], {
    T: Item.of(`aquaculture:diamond_fillet_knife`),
    m: "aquaculture:neptunium_ingot",
    c: "numismatics:sun",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`aquaculture:diamond_fillet_knife`));
    return result.withNBT(item.nbt);
  });

  // BA brush
  e.shaped(`betterarcheology:iron_brush`, shapeTemplate, {
    T: Item.of(`minecraft:brush`),
    m: "minecraft:iron_ingot",
    c: "numismatics:cog",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`minecraft:brush`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`betterarcheology:diamond_brush`, shapeTemplate, {
    T: Item.of("betterarcheology:iron_brush"),
    m: "minecraft:diamond",
    c: "numismatics:crown",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("betterarcheology:iron_brush"));
    return result.withNBT(item.nbt);
  });
  e.shaped(`betterarcheology:netherite_brush`, ["cmc", "cTc", "csc"], {
    T: Item.of(`betterarcheology:diamond_brush`),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_upgrade_smithing_template",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`betterarcheology:diamond_brush`));
    return result.withNBT(item.nbt);
  });
  // Knives
  e.shaped(`farmersdelight:iron_knife`, shapeTemplate, {
    T: Item.of(`farmersdelight:flint_knife`),
    m: "minecraft:iron_ingot",
    c: "numismatics:cog",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`farmersdelight:flint_knife`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`farmersdelight:golden_knife`, shapeTemplate, {
    T: Item.of(`farmersdelight:iron_knife`),
    m: "minecraft:gold_ingot",
    c: "numismatics:crown",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`farmersdelight:iron_knife`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`farmersdelight:diamond_knife`, shapeTemplate, {
    T: Item.of("farmersdelight:golden_knife"),
    m: "minecraft:diamond",
    c: "numismatics:sun",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("farmersdelight:golden_knife"));
    return result.withNBT(item.nbt);
  });
  e.shaped(`farmersdelight:netherite_knife`, ["cmc", "cTc", "csc"], {
    T: Item.of(`farmersdelight:diamond_knife`),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_upgrade_smithing_template",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`farmersdelight:diamond_knife`));
    return result.withNBT(item.nbt);
  });
  // Fishing Rods
  e.shaped(`aquaculture:iron_fishing_rod`, shapeTemplate, {
    T: Item.of(`minecraft:fishing_rod`),
    m: "minecraft:iron_ingot",
    c: "numismatics:crown",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`minecraft:fishing_rod`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`aquaculture:gold_fishing_rod`, shapeTemplate, {
    T: Item.of(`aquaculture:iron_fishing_rod`),
    m: "minecraft:gold_ingot",
    c: "numismatics:crown",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`aquaculture:iron_fishing_rod`));
    return result.withNBT(item.nbt);
  });
  e.shaped(`aquaculture:diamond_fishing_rod`, shapeTemplate, {
    T: Item.of("aquaculture:gold_fishing_rod"),
    m: "minecraft:diamond",
    c: "numismatics:sun",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("aquaculture:gold_fishing_rod"));
    return result.withNBT(item.nbt);
  });
  e.shaped(`aquaculture:neptunium_fishing_rod`, shapeTemplate, {
    T: Item.of(`aquaculture:diamond_fishing_rod`),
    m: "aquaculture:neptunium_ingot",
    c: "numismatics:sun",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of(`aquaculture:diamond_fishing_rod`));
    return result.withNBT(item.nbt);
  });

  // Misc
  e.shaped("create:netherite_backtank", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_backtank"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_chestplate",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_backtank"));
    return result.withNBT(item.nbt);
  });
  e.shaped("create:netherite_diving_helmet", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_diving_helmet"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_helmet",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_diving_helmet"));
    return result.withNBT(item.nbt);
  });
  e.shaped("create:netherite_diving_boots", ["cmc", "cTc", "csc"], {
    T: Item.of("create:copper_diving_boots"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_boots",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("create:copper_diving_boots"));
    return result.withNBT(item.nbt);
  });
  e.shaped("quark:flamerang", ["cmc", "cTc", "csc"], {
    T: Item.of("quark:pickarang"),
    m: "minecraft:netherite_ingot",
    c: "numismatics:sun",
    s: "minecraft:netherite_upgrade_smithing_template",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("quark:pickarang"));
    return result.withNBT(item.nbt);
  });
  // Wool armor
  const upgradeWool = (type, mappedType) => {
    e.shaped(`minecraft:chainmail_${mappedType}`, shapeTemplate, {
      T: Item.of(`sewingkit:wool_${type}`),
      m: "minecraft:chain",
      c: "numismatics:bevel",
    }).modifyResult((grid, result) => {
      let item = grid.find(Item.of(`sewingkit:wool_${type}`));
      return result.withNBT(item.nbt);
    });
  };
  [
    { wool: "hat", upgrade: "helmet" },
    { wool: "shirt", upgrade: "chestplate" },
    { wool: "pants", upgrade: "leggings" },
    { wool: "shoes", upgrade: "boots" },
  ].forEach((entry) => {
    upgradeWool(entry.wool, entry.upgrade);
  });
  e.shapeless("society:dragontooth_axe", [
    "minecraft:diamond_axe",
    "quark:dragon_scale",
  ]).modifyResult((grid, result) => {
    let item = grid.find(Item.of("minecraft:diamond_axe"));
    return result.withNBT(item.nbt);
  });
  // Watering Cans
  upgradeTool("watering_can", "dew_drop_watering_cans");
  e.shaped("dew_drop_watering_cans:iron_watering_can", shapeTemplate, {
    T: Item.of("dew_drop_watering_cans:copper_watering_can"),
    m: "minecraft:iron_ingot",
    c: "numismatics:cog",
  }).modifyResult((grid, result) => {
    let item = grid.find(Item.of("dew_drop_watering_cans:copper_watering_can"));
    return result.withNBT(item.nbt);
  });
});
