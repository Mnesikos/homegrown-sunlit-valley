StartupEvents.registry("block", (e) => {
  e
    .create("society:ancient_fruit", "crop")
    .age(10, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 3, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 4, 16)
        .shape(3, 0, 0, 0, 16, 8, 16)
        .shape(4, 0, 0, 0, 16, 8, 16)
        .shape(5, 0, 0, 0, 16, 16, 16)
        .shape(6, 0, 0, 0, 16, 16, 16)
        .shape(7, 0, 0, 0, 16, 21, 16)
        .shape(8, 0, 0, 0, 16, 21, 16)
        .shape(9, 0, 0, 0, 16, 21, 16)
        .shape(10, 0, 0, 0, 16, 24, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("society:ancient_fruit", 1)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("society:item/ancient_seed");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage1" },
      },
      {
        when: { age: 2 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage1" },
      },
      {
        when: { age: 3 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage2" },
      },
      {
        when: { age: 4 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage2" },
      },
      {
        when: { age: 5 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage2" },
      },
      {
        when: { age: 6 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage3" },
      },
      {
        when: { age: 7 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage3" },
      },
      {
        when: { age: 8 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage4" },
      },
      {
        when: { age: 9 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage4" },
      },
      {
        when: { age: 10 },
        apply: { model: "society:block/crops/ancient_fruit_crop_stage5" },
      },
    ],
  };
  e
    .create("society:tubabacco_leaf", "crop")
    .age(9, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 5, 16)
        .shape(3, 0, 0, 0, 16, 5, 16)
        .shape(4, 0, 0, 0, 16, 10, 16)
        .shape(5, 0, 0, 0, 16, 10, 16)
        .shape(6, 0, 0, 0, 16, 10, 16)
        .shape(7, 0, 0, 0, 16, 10, 16)
        .shape(8, 0, 0, 0, 16, 16, 16)
        .shape(9, 0, 0, 0, 16, 16, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("society:tubabacco_leaf", 1)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("society:item/tubabacco_seed");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "society:block/crops/tubabacco_plant_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "society:block/crops/tubabacco_plant_stage0" },
      },
      {
        when: { age: 2 },
        apply: { model: "society:block/crops/tubabacco_plant_stage0" },
      },
      {
        when: { age: 3 },
        apply: { model: "society:block/crops/tubabacco_plant_stage1" },
      },
      {
        when: { age: 4 },
        apply: { model: "society:block/crops/tubabacco_plant_stage1" },
      },
      {
        when: { age: 5 },
        apply: { model: "society:block/crops/tubabacco_plant_stage2" },
      },
      {
        when: { age: 6 },
        apply: { model: "society:block/crops/tubabacco_plant_stage2" },
      },
      {
        when: { age: 7 },
        apply: { model: "society:block/crops/tubabacco_plant_stage3" },
      },
      {
        when: { age: 8 },
        apply: { model: "society:block/crops/tubabacco_plant_stage3" },
      },
      {
        when: { age: 9 },
        apply: { model: "society:block/crops/tubabacco_plant_stage4" },
      },
    ],
  };

  e
    .create("farm_and_charm:strawberry", "crop")
    .age(5, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 2, 16)
        .shape(1, 0, 0, 0, 16, 4, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 8, 16)
        .shape(4, 0, 0, 0, 16, 10, 16)
        .shape(5, 0, 0, 0, 16, 12, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("farm_and_charm:strawberry", 2)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("farm_and_charm:item/strawberry_seeds");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "farm_and_charm:block/strawberries_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "farm_and_charm:block/strawberries_stage1" },
      },
      {
        when: { age: 2 },
        apply: { model: "farm_and_charm:block/strawberries_stage2" },
      },
      {
        when: { age: 3 },
        apply: { model: "farm_and_charm:block/strawberries_stage3" },
      },
      {
        when: { age: 4 },
        apply: { model: "farm_and_charm:block/strawberries_stage4" },
      },
      {
        when: { age: 5 },
        apply: { model: "farm_and_charm:block/strawberries_stage5" },
      },
    ],
  };

  e
    .create("brewery:hop_trellis", "crop")
    .age(6, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 22, 16)
        .shape(1, 0, 0, 0, 16, 22, 16)
        .shape(2, 0, 0, 0, 16, 22, 16)
        .shape(3, 0, 0, 0, 16, 22, 16)
        .shape(4, 0, 0, 0, 16, 22, 16)
        .shape(5, 0, 0, 0, 16, 22, 16)
        .shape(6, 0, 0, 0, 16, 22, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("brewery:hops", 1)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("brewery:item/hops_seeds");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "society:block/crops/hops_crop_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "society:block/crops/hops_crop_stage1" },
      },
      {
        when: { age: 2 },
        apply: { model: "society:block/crops/hops_crop_stage1" },
      },
      {
        when: { age: 3 },
        apply: { model: "society:block/crops/hops_crop_stage2" },
      },
      {
        when: { age: 4 },
        apply: { model: "society:block/crops/hops_crop_stage2" },
      },
      {
        when: { age: 5 },
        apply: { model: "society:block/crops/hops_crop_stage3" },
      },
      {
        when: { age: 6 },
        apply: { model: "society:block/crops/hops_crop_stage4" },
      },
    ],
  };

  e
    .create("society:blueberry", "crop")
    .age(7, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 6, 16)
        .shape(2, 0, 0, 0, 16, 6, 16)
        .shape(3, 0, 0, 0, 16, 12, 16)
        .shape(4, 0, 0, 0, 16, 12, 16)
        .shape(5, 0, 0, 0, 16, 20, 16)
        .shape(6, 0, 0, 0, 16, 20, 16)
        .shape(7, 0, 0, 0, 16, 20, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("society:blueberry", 1)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("society:item/blueberry_seeds");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "society:block/crops/blueberry_crop_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "society:block/crops/blueberry_crop_stage1" },
      },
      {
        when: { age: 2 },
        apply: { model: "society:block/crops/blueberry_crop_stage1" },
      },
      {
        when: { age: 3 },
        apply: { model: "society:block/crops/blueberry_crop_stage2" },
      },
      {
        when: { age: 4 },
        apply: { model: "society:block/crops/blueberry_crop_stage2" },
      },
      {
        when: { age: 5 },
        apply: { model: "society:block/crops/blueberry_crop_stage3" },
      },
      {
        when: { age: 6 },
        apply: { model: "society:block/crops/blueberry_crop_stage4" },
      },
      {
        when: { age: 7 },
        apply: { model: "society:block/crops/blueberry_crop_stage5" },
      },
    ],
  };

  e
    .create("society:eggplant", "crop")
    .age(6, (builder) => {
      builder
        .shape(0, 0, 0, 0, 16, 4, 16)
        .shape(1, 0, 0, 0, 16, 6, 16)
        .shape(2, 0, 0, 0, 16, 7, 16)
        .shape(3, 0, 0, 0, 16, 7, 16)
        .shape(4, 0, 0, 0, 16, 13, 16)
        .shape(5, 0, 0, 0, 16, 13, 16)
        .shape(6, 0, 0, 0, 16, 16, 16);
    })
    .survive((state, level, pos) => {
      const FARMLAND = Java.loadClass(
        "net.minecraft.world.level.block.FarmBlock"
      );
      let blockState = level.getBlockState(pos.below());
      let mcBlock = blockState.block;
      if (mcBlock instanceof FARMLAND) {
        return true;
      } else return false;
    })
    .dropSeed(false)
    .crop("society:eggplant", 1)
    .tagBlock("minecraft:mineable/hoe")
    .item((seedItem) => {
      seedItem.texture("society:item/eggplant_seeds");
    }).blockstateJson = {
    multipart: [
      {
        when: { age: 0 },
        apply: { model: "society:block/crops/eggplant_crop_stage0" },
      },
      {
        when: { age: 1 },
        apply: { model: "society:block/crops/eggplant_crop_stage1" },
      },
      {
        when: { age: 2 },
        apply: { model: "society:block/crops/eggplant_crop_stage1" },
      },
      {
        when: { age: 3 },
        apply: { model: "society:block/crops/eggplant_crop_stage2" },
      },
      {
        when: { age: 4 },
        apply: { model: "society:block/crops/eggplant_crop_stage2" },
      },
      {
        when: { age: 5 },
        apply: { model: "society:block/crops/eggplant_crop_stage3" },
      },
      {
        when: { age: 6 },
        apply: { model: "society:block/crops/eggplant_crop_stage4" },
      },
    ],
  };
});
