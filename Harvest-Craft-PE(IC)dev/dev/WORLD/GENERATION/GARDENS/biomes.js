/*LEGACY
var SaltBiomes = [0,24,10];
	//var SaltBiomes = __config__.access("generation.biomes.gardens.SaltBiomes");
var BerryGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var BerryGardenBiomes = __config__.access("generation.biomes.gardens.BerryGardenBiomes");
var CandleberryGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var CandleberryGardenBiomes = __config__.access("generation.biomes.gardens.CandleberryGardenBiomes");
var DesertGardenBiomes =[2,35,37,135];
	//var DesertGardenBiomes = __config__.access("generation.biomes.gardens.DesertGardenBiomes");
var GourdGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var GourdGardenBiomes = __config__.access("generation.biomes.gardens.GourdGardenBiomes");
var GrassGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var GrassGardenBiomes = __config__.access("generation.biomes.gardens.GrassGardenBiomes");
var GroundGardenBiomes =[1,4,3,132,129,34,4, 18, 27, 28,13];
	//var GroundGardenBiomes = __config__.access("generation.biomes.gardens.GroundGardenBiomes");
var HerbGardenBiomes =  [1,4,3,132,129,34, 18, 27, 28];
	//var HerbGardenBiomes = __config__.access("generation.biomes.gardens.HerbGardenBiomes");
var LeafyGardenBiomes = [1,4,3,132,129,34, 18, 27, 28,13];
	//var LeafyGardenBiomes = __config__.access("generation.biomes.gardens.LeafyGardenBiomes");
var MushroomGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var MushroomGardenBiomes = __config__.access("generation.biomes.gardens.MushroomGardenBiomes");
var StalkGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var StalkGardenBiomes = __config__.access("generation.biomes.gardens.StalkGardenBiomes");
var TextileGardenBiomes = [1,4,3,132,129,34, 18, 27, 28];
	//var TextileGardenBiomes = __config__.access("generation.biomes.gardens.TextileGardenBiomes");
var TropicalGardenBiomes = [21, 22, 23, 149, 151,6, 134,36];
	//var TropicalGardenBiomes = __config__.access("generation.biomes.gardens.TropicalGardenBiomes");
var WaterGardenBiomes = [24,0];
	//var WaterGardenBiomes = __config__.access("generation.biomes.gardens.WaterGardenBiomes");
var FrostyGardenBiomes = [12,140,30,158,11,26];
Callback.addCallback("ItemUse", function(coords, item, block){
	alert(World.getBiome(coords.x, coords.z));
});*/

var SaltBiomes = [0,24,10];

var gardensBiomes = {
    arid: [2,35,37,135],

    berry: [1,4,3,132,129,34, 18, 27, 28,13],

    candleberry: [1,4,3,132,129,34, 18, 27, 28,13],

    cotton: [1,4,3,132,129,34, 18, 27, 28],

    frosty: [12,140,30,158,11,26],

    gourd: [1,4,3,132,129,34, 18, 27, 28,13],

    grass: [1,4,3,132,129,34, 18, 27, 28],

    ground: [1,4,3,132,129,34,4, 18, 27, 28,13],

    herb: [1,4,3,132,129,34, 18, 27, 28],

    leafy: [1,4,3,132,129,34, 18, 27, 28,13],

    stalk: [1,4,3,132,129,34, 18, 27, 28],

    tropical: [21, 22, 23, 149, 151,6, 134,36]
};