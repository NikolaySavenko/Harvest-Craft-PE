var candleVariations = [];
for(let i = 0; i < 16; i++){
	candleVariations.push({name: "Candle", texture: [["empty", 0],["empty", 0],["candle", i]], inCreative: false})
};
IDRegistry.genBlockID("candle");
Block.createBlock("candle", candleVariations, BLOCK_TYPE_CANDLE);
//PlantModel.tree(BlockID.candle, 0);
Block.setAnimateTickCallback(BlockID.candle, function(x, y, z, id, data) {
	if(!particles) return;
	var vel = {
		x: Random.Float(-0.01, 0.01),
		y: Random.Float(-0.01, 0.01),
		z: Random.Float(-0.01, 0.01)
	};
	Particles.addParticle(Native.ParticleType.flame,x + .5, y + .5, z + .5, vel.x, vel.y, vel.y, 0);
});
Block.registerDropFunction("candle", function(coords, blockID, blockData, level){
	return[[ItemID["candleItem" + blockData], 1, 0]];
});