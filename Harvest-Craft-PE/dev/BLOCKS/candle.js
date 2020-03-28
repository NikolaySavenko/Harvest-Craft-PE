var BLOCK_TYPE_CANDLE = Block.createSpecialType({
    base: 50,
    opaque: false,
	lightopacity: 0,
	rendertype: 1,
	lightlevel: 10,
	destroytime: 0,
	explosionres: 0
});

var candleVariations = [];
for(let i = 0; i < 16; i++){
	candleVariations.push({name: "Candle", texture: [["candle", i]], inCreative: false})
};

IDRegistry.genBlockID("candle");
Block.createBlock("candle", candleVariations, BLOCK_TYPE_CANDLE);
Block.setBlockShape(BlockID.candle,
	{x: 0, y: 0, z: 0},
	{x: 1, y: 0.001, z: 1}
);

Block.setAnimateTickCallback(BlockID.candle, function(x, y, z, id, data) {
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