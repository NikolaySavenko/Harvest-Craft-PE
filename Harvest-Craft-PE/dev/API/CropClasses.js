var CropsConfig = {
    HarvestcraftCrop: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.crops")),
        growChance: parseFloat(__config__.access("other.growChance.crops"))
    },

    HarvestcraftFruit: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.fruits")),
        growChance: parseFloat(__config__.access("other.growChance.fruits"))
    },

    HarvestcraftSapling: {
        ageSpeed: parseFloat(__config__.access("other.ageSpeed.saplings")),
        growChance: parseFloat(__config__.access("other.growChance.saplings"))
    }
};

var FlowerCrop = $("FlowerCrop", {
    registerAsFlower: function(id, datas){
        for(var m = 0; m < datas; m++){
            ForestryAPI.BeeRegistry.FLOWERS_FLOWERS.push(id + ':' + m);
        }//TODO test flowers
    }
});

var HarvestcraftCrop = $("HarvestCraftCrop", {
    extends: NormalCrop,
    includes: [FlowerCrop],
    blockType: CommonCrop,
    maxSize: 2,
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: CropsConfig.HarvestcraftCrop.growChance,
    growChance: CropsConfig.HarvestcraftCrop.ageSpeed,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 3);
        this.super.__load__();
    }
});
var HarvestcraftFruit = $("HarvestcraftFruit", {
    extends: HarvestcraftCrop,
    includes: [FlowerCrop],
    blockType: CommonSapling,
    side: 0,
    maxSize: 2,
    farmlands: [{id: 18, data: -1}],
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: CropsConfig.HarvestcraftFruit.growChance,
    growChance: CropsConfig.HarvestcraftFruit.ageSpeed,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 3);
        this.super.__load__();
    }
});

var HarvestcraftGarden = $("HarvestcraftGarden", {
    extends: NormalBush,
    includes: [FlowerCrop],
    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],
    maxSize: 1,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);
        this.super.__load__();
    }
});

var HarvestcraftAridGarden = $("HarvestcraftAridGarden", {
    extends: NormalBush,
    blockType: CommonSapling,
    farmlands: [{id: 12, data: -1}],
    maxSize: 1,
    __load__: function(){
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);
        this.super.__load__();
    },
    registerAsFlower: function(id, datas){
        for(var m = 0; m < datas; m++){
            ForestryAPI.BeeRegistry.FLOWERS_CACTI.push(id + ':' + m);
        }
    }
});

let HarvestcraftSapling = $("HarvestcraftSapling", {
    extends: PuttableCrop,
    includes: [CropFertilizer, InterfaceCrop, CropParticles, FlowerCrop],

    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],

    growChanceViaFertilizer: CropsConfig.HarvestcraftSapling.growChance,
    growChance: CropsConfig.HarvestcraftSapling.ageSpeed,

    maxSize: 1,

    click: function(coords, item, block){
        if(this.isFertilizer(item)){
            this.emitParticles(coords.x, coords.y, coords.z);
            if(this.isReadyForFertilize(block)){
                this.grow(coords.x, coords.y, coords.z);
            }
        }
    },
//! emergency crutch. sorry...
    isReadyForFertilize: function(block){
        if(Math.random() < CropsConfig.HarvestcraftSapling.growChance) return true;
        return false;
    },
//! emergency crutch again. sorry...
    randomTick: function(x, y, z){
        this.checkFarmland(x, y, z);
        if(Math.random() < CropsConfig.HarvestcraftSapling.ageSpeed) this.grow(x, y, z);
    },

    canGrow: function(x, y, z){
        return true
    },

    grow: function(x, y, z){
        let tree = TreeRegistry.getTreeFromSaplingBlock(parseInt(this.blockID));
        TreeRegistry.deployTree(x, y, z, tree);
        return true
    },

    destroyBlock: function(coords, block, player){
        this.checkFarmlandDestroy(coords, block);
        if(block.id == parseInt(this.blockID)){
            let seed = this.params.seed;
            World.drop(coords.x, coords.y, coords.z, seed.id, 1, 0);
        }
    },

    checkFarmlandDestroy: function(coords, block){
        let side = this.getSide();
        if(!(this.isFarmland(block) && side)) return;

        let relCoords = World.getRelativeCoords(coords.x, coords.y, coords.z, side);
        let relBlock = World.getBlock(relCoords.x, relCoords.y, relCoords.z);
        if(relBlock.id == parseInt(this.blockID)){
            World.destroyBlock(relCoords.x, relCoords.y, relCoords.z);
            this.destroyBlock(relCoords, relBlock, null);
        }
    },

    __load__:function(){
        this.super.__load__();
        let id = parseInt(this.blockID);
        if(ForestryAPI) this.registerAsFlower(id, 1);

        let self = this;
        Block.registerDropFunctionForID(parseInt(this.blockID), function(){
            return [];
        });

        Callback.addCallback("ItemUse", function(coords, item, block){
            if(block.id != parseInt(self.blockID)) return;
            self.click(coords, item, block);
        });

        Block.setRandomTickCallback(parseInt(self.blockID), function(x, y, z){
            self.randomTick(x, y, z, self.getSide());
        });

        Callback.addCallback("DestroyBlock", function(coords, block, player){
            self.destroyBlock(coords, block, player);
        });
    }
});