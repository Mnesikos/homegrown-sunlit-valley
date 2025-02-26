const starvationPrevention = (entity) => {
  let entityNbt = entity.getNbt();
  if (entity.level.time - entity.persistentData.getInt("ageLastFed") > 12000) {
    entityNbt.EggLayTime = 20400;
  } else if (entity.persistentData.getInt("affection") < 200) {
    entityNbt.EggLayTime = 20400;
  } else if (entityNbt.EggLayTime > 12000) entityNbt.EggLayTime = 10240;
  entity.setNbt(entityNbt);
};

EntityJSEvents.modifyEntity((event) => {
  event.modify("minecraft:chicken", (modifyBuilder) => {
    modifyBuilder.tick((entity) => {
      if (entity.level.time % 1000 === 0) {
        starvationPrevention(entity);
      }
    });
  });
  event.modify("untitledduckmod:duck", (modifyBuilder) => {
    modifyBuilder.tick((entity) => {
      if (entity.level.time % 1000 === 0) {
        starvationPrevention(entity);
      }
    });
  });
  event.modify("untitledduckmod:goose", (modifyBuilder) => {
    modifyBuilder.tick((entity) => {
      if (entity.level.time % 1000 === 0) {
        starvationPrevention(entity);
      }
    });
  });
  event.modify("autumnity:turkey", (modifyBuilder) => {
    modifyBuilder.tick((entity) => {
      if (entity.level.time % 1000 === 0) {
        starvationPrevention(entity);
        let entityNbt = entity.getNbt();
        if (1000 <= entityNbt.EggLayTime <= 2000 && Math.random() <= 0.5) {
          entityNbt.EggLayTime = entityNbt.EggLayTime * 2;
        }
      }
    });
  });
  event.modify("etcetera:chapple", (modifyBuilder) => {
    modifyBuilder.tick((entity) => {
      if (entity.level.time % 1000 === 0) {
        let entityNbt = entity.getNbt();
        if (entity.level.time - entity.persistentData.getInt("ageLastFed") > 12000) {
          entityNbt.AppleLayTime = 20400;
        } else if (entityNbt.AppleLayTime > 12000)
          entityNbt.AppleLayTime = 10240;
        entity.setNbt(entityNbt);
      }
    });
  });
});
