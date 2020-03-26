function getPlaceFuncForCandle(i){
	return function(coords, item, block){
		if(coords.side == 1 && !GenerationUtils.isTransparentBlock(block.id)){
			World.setBlock(coords.x, coords.y + 1,coords.z, BlockID.candle, i);
			Player.decreaseCarriedItem(1);
		}
	};
}
for(var i = 0; i < 16; i++){
	IDRegistry.genItemID("candleItem" + i);
	Item.createItem("candleItem" + i, "Candle", {name: "candle", meta: i}, {});
	Item.registerUseFunction("candleItem"+ i , getPlaceFuncForCandle(i));
};

Callback.addCallback("PostLoaded", function(){
	Recipes.addShapeless({id: ItemID.candleItem0, count: 4, data: 0}, [{id: 287, data: 0}, {id: ItemID.pressedWax, data: 0}]);
	for(var paintIndex = 14; paintIndex >= 0; paintIndex--){
		var candleData = 15 - paintIndex;
		Recipes.addShapeless({id: Item.getNumericId("candleItem" + candleData), count: 4, data: 0}, [{id: 351, data: paintIndex},{id: ItemID.candleItem0, data: 0},{id: ItemID.candleItem0, data: 0},{id: ItemID.candleItem0, data: 0}]);
	}
});