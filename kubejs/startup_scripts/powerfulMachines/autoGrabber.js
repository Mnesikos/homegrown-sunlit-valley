console.info("[SOCIETY] autoGrabber.js loaded");

StartupEvents.registry("block", (event) => {
  event
    .create("society:auto_grabber")
    .tagBlock("minecraft:mineable/pickaxe")
    .tagBlock("minecraft:needs_stone_tool")
    .box(0, 0, 0, 16, 16, 16)
    .defaultCutout()
    .item((item) => {
      item.tooltip(
        Text.gray(
          "Harvests Milk and Special items from Farm Animals.\nUses skills of player that places it."
        )
      );
      item.tooltip(Text.lightPurple("Requires Sparkstone"));
      item.modelJson({
        parent: "society:block/auto_grabber",
      });
    })
    .model("society:block/auto_grabber")
    .blockEntity((blockInfo) => {
      blockInfo.inventory(9, 1);
      blockInfo.initialData({ owner: "-1" });
      blockInfo.serverTick(1200, 0, (entity) => {
        const { inventory, block, level } = entity;
        let attachedPlayer;
        let playerAttributes;
        let playerStages;
        inventory.allItems;
        let nearbyFarmAnimals;
        nearbyFarmAnimals = level
          .getEntitiesWithin(AABB.ofBlock(block).inflate(10))
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
            let data = animal.persistentData;
            let interactionCooldown = global.animalInteractionCooldown;
            if (global.checkEntityTag(entity, "society:milkable_animal")) {
              if (
                animal.type === "minecraft:goat" ||
                animal.type === "species:mammutilation"
              ) {
                interactionCooldown *= 2;
              } else if (animal.type === "minecraft:sheep") {
                interactionCooldown *= 1.5;
              }

              let milkItem = global.getMilk(
                level,
                animal,
                data,
                undefined,
                interactionCooldown
              );
              if (milkItem !== -1) {
                let success = entity.inventory.insertItem(milkItem, false);
                if (success) {
                  entity.persistentData.putInt("mana", mana - MANA_PER_MILK);

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
