function getSinkVariation(i){
	return {name: "Sink", texture: [["sinkbottom", 0], ["sinktop", 0], ["sinkside", 0]], inCreative: true}
}
let sinkVariations = [];

for(let i = 0; i < 4; i++){
	sinkVariations.push(getSinkVariation(i));
}

IDRegistry.genBlockID("sink");
Block.createBlock("sink", sinkVariations);

Callback.addCallback("ItemUse", function(coords,item,block){//TODO rebuild for LiquidItemRegistry
	if(block.id == BlockID.sink){
		if((item.id == 325 && item.data == 0)){
			Player.addItemToInventory(325, 1, 8);
			Player.decreaseCarriedItem(1);
		}
		if(item.id == 374){
			Player.addItemToInventory(373, 1, 0);
			Player.decreaseCarriedItem(1);
		}
	}
});
