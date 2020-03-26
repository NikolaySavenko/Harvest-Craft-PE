var HarvestcraftCrop = $("HarvestCraftCrop", {
    extends: NormalCrop,
    blockType: CommonCrop,
    maxSize: 2,
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: .5,
    growChance: .5,
    __load__: function(){
        this.super.__load__();
    }
});

var HarvestcraftFruit = $("HarvestcraftFruit", {
    extends: HarvestcraftCrop,
    blockType: CommonSapling,
    side: 0,
    maxSize: 2,
    farmlands: [{id: 18, data: -1}],
    particles: {
        count: 10,
        type: Native.ParticleType.happyVillager
    },
    growChanceViaFertilizer: .5,
    growChance: .5,
    __load__: function(){
        this.super.__load__();
    }
});

var HarvestcraftGarden = $("HarvestcraftGarden", {
    extends: NormalBush,
    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],
    maxSize: 1,
    __load__: function(){
        this.super.__load__();
    }
});

var HarvestcraftAridGarden = $("HarvestcraftAridGarden", {
    extends: NormalBush,
    blockType: CommonSapling,
    farmlands: [{id: 12, data: -1}],
    maxSize: 1,
    __load__: function(){
        this.super.__load__();
    }
});

let HarvestcraftSapling = $("HarvestcraftSapling", {
    extends: PuttableCrop,
    includes: [CropFertilizer, InterfaceCrop, CropParticles],

    blockType: CommonSapling,
    farmlands: [{id: 60, data: -1}, {id: 2, data: -1}, {id: 3, data: -1}],

    growChanceViaFertilizer: .5,
    growChance: .5,

    maxSize: 1,

    click: function(coords, item, block){
        if(this.isFertilizer(item)){
            this.emitParticles(coords.x, coords.y, coords.z);
            if(this.isReadyForFertilize(block)){
                this.grow(coords.x, coords.y, coords.z);
            }
        }
    },

    isReadyForFertilize: function(block){
        if(Math.random() < this.getGrowChanceViaFertilizer()) return true;
        return false;
    },

    randomTick: function(x, y, z){
        this.checkFarmland(x, y, z);
        if(Math.random() < this.getGrowChance()) this.grow(x, y, z);
    },

    canGrow: function(x, y, z){
        return true
    },

    grow: function(x, y, z){
        alert("grow");
        let tree = TreeRegistry.getTreeFromSaplingBlock(parseInt(this.blockID));
        alert("tree "+tree  +" "+this.blockID);
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

        let self = this;
        let shape = CropRegistry.shapeBySide[this.getSide()];
        Block.setBlockShape(parseInt(this.blockID), shape[0], shape[1]);
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