console.info("[SOCIETY] autoGrabber.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:artisan_hopper", "cardinal")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(
        Text.gray("Inserts items into Artisan Machines from inventory above.")
      );
      item.tooltip(
        Text.gray(
          "Harvests outputs from Artisan Machines into inventory below."
        )
      );
      item.tooltip(Text.gray("Uses the skills of player that places it."));
      item.tooltip(Text.green(`Area: 5x5`));
      item.tooltip(Text.lightPurple("Requires Sparkstone"));
      item.modelJson({
        parent: "society:block/artisan_hopper",
      });
    })
    .soundType("copper")
    .model("society:block/artisan_hopper")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 2);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(200, 0, (entity) => {
        const { inventory, block, level } = entity;
        let attachedPlayer;
        let playerAttributes;
        let playerStages;
        inventory.allItems;
        let nearbyFarmAnimals;
        nearbyFarmAnimals = level
          .getEntitiesWithin(AABB.ofBlock(block).inflate(5))
          .filter((entity) =>
            global.checkEntityTag(entity, "society:husbandry_animal")
          );
        level.players.forEach((p) => {
          if (p.getUuid().toString() === block.getEntityData().data.owner) {
            playerAttributes = p.nbt.Attributes;
            playerStages = p.stages;
            attachedPlayer = p;
          }
        });
        if (playerAttributes) {
          nearbyFarmAnimals.forEach((animal) => {
            if (
              global.inventoryHasItems(inventory, "society:sparkstone", 1) != 1
            )
              return;
            let data = animal.persistentData;
            let interactionCooldown = global.animalInteractionCooldown;
            if (global.checkEntityTag(animal, "society:milkable_animal")) {
              interactionCooldown *= global.getMilkingTimeMult(animal.type);
              let milkItem = global.getMilk(
                level,
                animal,
                data,
                attachedPlayer,
                interactionCooldown
              );
              if (milkItem !== -1) {
                let insertedMilk =
                  global.insertBelow(level, block, milkItem) == 1;
                if (insertedMilk) {
                  if (
                    global.useInventoryItems(
                      inventory,
                      "society:sparkstone",
                      1
                    ) != 1
                  )
                    console.error(
                      "Sparkstone not consumed when it should have been!"
                    );
                  level.server.runCommandSilent(
                    `playsound minecraft:entity.cow.milk block @a ${animal.x} ${animal.y} ${animal.z}`
                  );
                  level.spawnParticles(
                    "atmospheric:aloe_blossom",
                    true,
                    animal.x,
                    animal.y + 1.5,
                    animal.z,
                    0.1 * rnd(1, 4),
                    0.1 * rnd(1, 4),
                    0.1 * rnd(1, 4),
                    5,
                    0.01
                  );
                }
              }
            }
            if (
              global.inventoryHasItems(inventory, "society:sparkstone", 1) != 1
            )
              return;
            global.handleSpecialHarvest(
              level,
              animal,
              attachedPlayer,
              attachedPlayer.server,
              block,
              inventory,
              handleSpecialItem
            );
          });
        }
      }),
        blockInfo.rightClickOpensInventory();
      blockInfo.attachCapability(
        CapabilityBuilder.ITEM.blockEntity()
          .extractItem((blockEntity, slot, stack, simulate) =>
            blockEntity.inventory.extractItem(slot, stack, simulate)
          )
          .getSlotLimit((blockEntity, slot) =>
            blockEntity.inventory.getSlotLimit(slot)
          )
          .getSlots((blockEntity) => blockEntity.inventory.slots)
          .getStackInSlot((blockEntity, slot) =>
            blockEntity.inventory.getStackInSlot(slot)
          )
      );
    });
});
