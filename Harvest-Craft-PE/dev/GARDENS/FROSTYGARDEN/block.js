IDRegistry.genBlockID("frostygarden"); //PlantModel
Block.createBlock("frostygarden", [
	{name: "Frosty garden", texture: [["empty", 0],["empty", 0],["frostygarden", 0]], inCreative: false}
],BLOCK_TYPE_PLANT);
//PlantModel.tree(BlockID.frostygarden,0);
CropRegistry.deriveCropAsClass("harvestcraft_garden",{
	id:BlockID.frostygarden,
	drop:0,
	seed:ItemID.frostyGardenITEM
});
Block.registerDropFunction("frostygarden", function(coords, blockID, blockData, level){
	var drop = [];
	if(Math.random() < .8){
		drop.push([ItemID.broccoli,Random.Int(1,3), 0]);
	}
	if(Math.random() < .8){
		drop.push([ItemID.parsnip,Random.Int(1,3), 0]);
	}
	if(Math.random() < .8){
		drop.push([ItemID.rye,Random.Int(1,3), 0]);
	}
	if(Math.random() < .8){
		drop.push([ItemID.oats,Random.Int(1,3), 0]);
	}
	return drop;
});