global.husbandryAnimals = [
  "minecraft:cow",
  "minecraft:goat",
  "minecraft:sheep",
  "minecraft:pig",
  "snowpig:snow_pig",
  "minecraft:rabbit",
  "meadow:wooly_cow",
  "meadow:wooly_sheep",
  "meadow:water_buffalo",
  "minecraft:chicken",
  "untitledduckmod:duck",
  "untitledduckmod:goose",
  "autumnity:turkey",
  "autumnity:snail",
  "minecraft:mooshroom",
  "buzzier_bees:moobloom",
  "minecraft:sniffer",
  "etcetera:chapple",
  "minecraft:panda",
  "species:mammutilation"
];

global.petAnimals = [
  "buzzier_bees:grizzly_bear",
  "minecraft:wolf",
  "minecraft:cat",
  "quark:foxhound",
  "quark:shiba",
  "minecraft:allay",
  "legendarycreatures:ender_wisp",
  "minecraft:horse",
  "minecraft:polar_bear",
  "hamsters:hamster"
];

global.milkableAnimals = [
  "minecraft:cow",
  "minecraft:goat",
  "minecraft:sheep",
  "meadow:wooly_sheep",
  "meadow:wooly_cow",
  "meadow:water_buffalo",
  "minecraft:mooshroom",
  "buzzier_bees:moobloom",
  "species:mammutilation"
];

global.largeEggAnimals = [
  "minecraft:chicken",
  "untitledduckmod:duck",
  "untitledduckmod:goose",
  "autumnity:turkey",
];

global.animalMessageSettings = `{anchor:3,background:1,wrap:1,align:0,color:"#FF5555",y:-100}`;

global.isFresh = (age, actionAge, interactionCooldown) => {
  if (actionAge < interactionCooldown) return false;
  return age < actionAge;
};
