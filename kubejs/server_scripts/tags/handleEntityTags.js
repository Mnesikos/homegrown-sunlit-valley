// priority: 0
console.info("[SOCIETY] handleEntityTags.js loaded");

ServerEvents.tags("entity_type", (e) => {
  global.husbandryAnimals.forEach((animal) => {
    e.add("society:husbandry_animal", animal);
  });

  [
    "minecraft:cow",
    "dragnlivestock:o_cow",
    "minecraft:goat",
    "dragnlivestock:o_goat",
    "dragnlivestock:farm_goat",
    "minecraft:sheep",
    "dragnlivestock:o_sheep",
    "meadow:wooly_sheep",
    "meadow:wooly_cow",
    "meadow:water_buffalo",
    "minecraft:mooshroom",
    "dragnlivestock:o_mooshroom",
    "buzzier_bees:moobloom",
    "dragnlivestock:wheat_moobloom",
    "dragnlivestock:sweet_berry_moobloom",
    "dragnlivestock:pumpkin_moobloom",
    "dragnlivestock:potato_moobloom",
    "dragnlivestock:melon_moobloom",
    "dragnlivestock:glow_berry_moobloom",
    "dragnlivestock:flowering_moobloom",
    "dragnlivestock:carrot_moobloom",
    "dragnlivestock:beetroot_moobloom",
    "dragnlivestock:azalea_moobloom",
    "species:mammutilation",
    "farmlife:domestic_tribull",
    "wildernature:minisheep",
    "wildernature:bison",
    "minecraft:squid",
    "minecraft:glow_squid",
    "windswept:frostbiter"
  ].forEach((animal) => {
    e.add("society:milkable_animal", animal);
  });

  [
    "minecraft:chicken",
    "dragnlivestock:o_chicken",
    "untitledduckmod:duck",
    "untitledduckmod:goose",
    "etcetera:chapple",
    "autumnity:turkey",
    "species:wraptor",
    "wildernature:flamingo",
    "wildernature:penguin",
    "farmlife:galliraptor",
  ].forEach((animal) => {
    e.add("society:coopmaster_bird", animal);
  });

  const petAnimals = [
    "buzzier_bees:grizzly_bear",
    "minecraft:wolf",
    "workdog:wolf",
    "workdog:akita",
    "workdog:border_collie",
    "workdog:boston_terrier",
    "workdog:german_shepherd",
    "workdog:jack_russell_terrier",
    "workdog:pit_bull",
    "minecraft:cat",
    "simplycats:cat",
    "dragnpets:o_fox",
    "dragnpets:o_ocelot",
    "dragnpets:macaw",
    "dragnpets:cockatiel",
    "dragnpets:ringneck",
    "quark:foxhound",
    "quark:shiba",
    "minecraft:allay",
    "legendarycreatures:ender_wisp",
    "minecraft:horse",
    "horse_colors:horse_felinoid",
    "dragnlivestock:caribou",
    "dragnlivestock:o_camel",
    "dragnlivestock:o_llama",
    "dragnlivestock:unicorn",
    "minecraft:polar_bear",
    "hamsters:hamster",
    "adorablehamsterpets:hamster",
    "wildernature:red_wolf",
    "wildernature:owl",
    "wildernature:dog",
    "minecraft:axolotl",
    "dragnpets:o_axolotl",
    "wildernature:hedgehog",
    "crittersandcompanions:ferret",
    "crittersandcompanions:shima_enaga",
  ];
  petAnimals.forEach((animal) => {
    e.add("society:pet_animal", animal);
  });
  ["wildernature:flamingo", "farmlife:galliraptor", "farmlife:domestic_tribull"].forEach(
    (animal) => {
      e.add("society:infertile", animal);
    }
  );
  ["longwings:moth", "longwings:butterfly"].forEach((animal) => {
    e.add("society:longwing", animal);
  });

  [
    "dragnlivestock:o_cow",
    "dragnlivestock:o_goat",
    "dragnlivestock:farm_goat",
    "dragnlivestock:o_sheep",
    "dragnlivestock:o_pig",
    "dragnlivestock:o_rabbit",
    "dragnlivestock:o_chicken",
    "dragnlivestock:o_mooshroom",
    "dragnlivestock:wheat_moobloom",
    "dragnlivestock:sweet_berry_moobloom",
    "dragnlivestock:pumpkin_moobloom",
    "dragnlivestock:potato_moobloom",
    "dragnlivestock:melon_moobloom",
    "dragnlivestock:glow_berry_moobloom",
    "dragnlivestock:flowering_moobloom",
    "dragnlivestock:carrot_moobloom",
    "dragnlivestock:beetroot_moobloom",
    "dragnlivestock:azalea_moobloom",
    "dragnlivestock:caribou",
    "dragnlivestock:o_camel",
    "dragnlivestock:o_llama",
    "dragnlivestock:unicorn",
    "dragnpets:o_fox",
    "dragnpets:o_ocelot",
    "dragnpets:macaw",
    "dragnpets:cockatiel",
    "dragnpets:ringneck",
    "workdog:wolf",
    "workdog:akita",
    "workdog:border_collie",
    "workdog:boston_terrier",
    "workdog:german_shepherd",
    "workdog:jack_russell_terrier",
    "workdog:pit_bull",
    "simplycats:cat",
    "horse_colors:horse_felinoid",
  ].forEach((animal) => {
    e.add("society:gendered_animal", animal);
  });
});
