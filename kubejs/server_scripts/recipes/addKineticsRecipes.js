console.info("[SOCIETY] addKineticsRecipes.jsloaded");

ServerEvents.recipes((e) => {
  e.shaped("society:kinetic_blueprint", [
    "ppp", 
    "pBp",
    "ppp"
  ], {
    B: "society:kinetic_blueprint",
    p: "minecraft:paper",
  }).keepIngredient("society:kinetic_blueprint")

  e.shaped("create:windmill_bearing", [
    " B ", 
    "aCa",
    "asa"
  ], {
    B: "society:kinetic_blueprint",
    C: "numismatics:sprocket",
    s: "create:shaft",
    a: "create:andesite_casing"
  }).keepIngredient("society:kinetic_blueprint")

  e.shaped("create:water_wheel", [
    "lBl", 
    "lCl",
    "lll"
  ], {
    B: "society:kinetic_blueprint",
    C: "numismatics:cog",
    l: "#minecraft:logs",
  }).keepIngredient("society:kinetic_blueprint")

  e.shaped("create:steam_engine", [
    " B ", 
    " C ",
    " c "
  ], {
    B: "society:kinetic_blueprint",
    C: "numismatics:crown",
    c: "create:copper_casing"
  }).keepIngredient("society:kinetic_blueprint")

  e.shaped("meadow:woodcutter", [
    " B ", 
    " a ",
    " L "
  ], {
    B: "society:kinetic_blueprint",
    L: "#minecraft:logs",
    a: "minecraft:iron_axe"
  }).keepIngredient("society:kinetic_blueprint")

});
