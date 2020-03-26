//MIDDLE
TreeRegistry.registerClass("Harvestcraft_middleFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_middleFruitTree",{
    fruitCount:7
});

var standartHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:0},wood:{id:17,data:0}});

TreeRegistry.registerClassPrototype("Harvestcraft_middleFruitTree",standartHarvestCraftTreePrototype);

//JUNGLE
TreeRegistry.registerClass("Harvestcraft_jungleFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_jungleFruitTree",{
    fruitCount:5
});

var jungleHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:3},wood:{id:17,data:3}});

TreeRegistry.registerClassPrototype("Harvestcraft_jungleFruitTree",jungleHarvestCraftTreePrototype);


//TAIGA
TreeRegistry.registerClass("Harvestcraft_taigaFruitTree");
TreeRegistry.registerClassConfig("Harvestcraft_taigaFruitTree",{
    fruitCount:4
});

var taigaHarvestCraftTreePrototype = TreeRegistry.generateStandartTreePrototypeWithParams({leaves:{id:18,data:4},wood:{id:162,data:0}});

TreeRegistry.registerClassPrototype("Harvestcraft_taigaFruitTree",taigaHarvestCraftTreePrototype);