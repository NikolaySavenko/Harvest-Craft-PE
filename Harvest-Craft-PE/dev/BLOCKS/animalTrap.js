IDRegistry.genBlockID("animalTrap");
Block.createBlock("animalTrap", [
    {name: "Animal trap", texture: [["animaltrap", 0]], inCreative: true}
]);

var elementsForTrap = {};
function isValidItemInTrap(){return false}
elementsForTrap["slotBait"] = {type: "slot", x: 408, y: 173, size: 71, bitmap: "slot", isTransparentBackground: true};
for(let i = 0; i < 18; i++){
	let x = i % 6;
    let y = Math.floor(i / 6);
	elementsForTrap["slot" + i] = {type: "slot", x: 553 + 72*x, y: 103 + 72*y, size: 71, isValid: isValidItemInTrap, bitmap: "slot", isTransparentBackground: true}
}

Callback.addCallback("PostLoaded", function(){
	Recipes.addShaped({id: BlockID.animalTrap, count: 1, data: 0}, [
		"aya",
		"rtr",
		"ara"
	], ["a", 280, 0, 'r', 287, -1, 't', 54, 0, 'y', 96, -1]);
});



var animalTrapGUI = new UI.StandartWindow({
	standart: {
        header: {
            text: {
                text:"AnimalTrap"
            }
        },
        inventory: {standart: true},
        background: {standart: true}
	},

    drawing: [
		{type: "bitmap", bitmap: "groundtrap", x: 320, y: 70, scale: 4}
	],

    elements: elementsForTrap
});

Block.setRandomTickCallback(BlockID.animalTrap, function(x, y, z){
    let tileEntity = World.getTileEntity(x, y, z);
    if(tileEntity) tileEntity.onRandomTick();
});

TileEntity.registerPrototype(BlockID.animalTrap, {
    defaultValues: {
        chance: .1
    },

    getGuiScreen: function(){
        return animalTrapGUI;
    },

    onRandomTick: function(){
        if(Math.random() < this.data.chance) this.produce();
    },

    produce: function(){
        let baitSlot = this.container.getSlot("slotBait");
        let result = this.swither(baitSlot.id);
        baitSlot.count--;
        if(this.checker() && result){
            this.putResult(result);
        }
        this.container.validateAll();
    },

    hasGrass: function(){

    },

    findSides: [2, 3, 4, 5],
    findedGrass: 0,
    findGrass: function(x, y, z){
        let newCount = count;
        for(let i in this.findSides){
            let coords = World.getRelativeCoords(this.x, this.y, this.z, this.findSides[i]);
            let block = World.getBlockID();
            //TODO finish
        }

    },

    putResult: function(result){
        let count = Random.Int(1, 3);
        for(var i = 0; i < count; i++){
            var targetItem = result[Random.Int(0, result.length - 1)];
            this.addResult("slot", targetItem, 1, 0);
        }
        this.container.validateAll();
    },

    checker:function(){//TODO rewrite
        if(World.getBlockID(this.x+1,this.y,this.z)==2&&
           World.getBlockID(this.x-1,this.y,this.z)==2&&
           World.getBlockID(this.x,this.y,this.z+1)==2&&
           World.getBlockID(this.x,this.y,this.z-1)==2&&
           World.getBlockID(this.x-1,this.y,this.z-1)==2&&
           World.getBlockID(this.x+1,this.y,this.z-1)==2&&
           World.getBlockID(this.x+1,this.y,this.z+1)==2&&
           World.getBlockID(this.x-1,this.y,this.z+1)==2) return true;
           return false;
    },

    tick: function(){
        var nnumber = __config__.access("traps.animal.number");
        var slot = this.container.getSlot("slotBait").id;
        if((this.data.progress<100)&&((slot==ItemID.graitBait)||(slot==ItemID.fruitBait)||(slot==ItemID.veggieBait))&&(Math.random()<nnumber)){
            this.checker();
        }
        if((this.data.progress==100)&&((slot==ItemID.graitBait)||(slot==ItemID.fruitBait)||(slot==ItemID.veggieBait))){
            var slot = this.container.getSlot("slotBait");
            slot.count-=1;
            this.data.progress=0;
            this.swither();
            var tt = Random.Int(1,3);
            for(var u = 0; u < tt; u++){
                var targetItem = this.data.drop[Random.Int(0,this.data.drop.length-1)];
                this.addResult("slot",targetItem, 1, 0);
            }
            this.container.validateAll();
        }
    },

    addResult: function(area, id, count, data){
        for (var i = 0; i < 18; i++){
            var slot = this.container.getSlot(area + i);
            if (slot.id == 0){
                var add = Math.min(64 - slot.count, count);
                slot.count += add;
                slot.id = id;
                slot.data = data;
                count -= add;
                if (count == 0){
                    break;
                }
            }
        }
        if (count > 0){
            World.drop(this.x + .5, this.y + 1, this.z + .5, id, count, data);
        }
    },

    swither:function(id){
        switch(id){
            case ItemID.graitBait :
                return [352, 334, 344,ItemID.turkeyRaw,288,365];
            case ItemID.fruitBait :
                return [352,334,344,288,411,365];
            case ItemID.veggieBait :
                return [352,334,344,ItemID.venisonRaw,288,365];
            default: return null;
        }
    }
});

StorageInterface.createInterface(BlockID.animalTrap, {
	slots: {
		"outSlot^0-17": {output: true}
	}
});