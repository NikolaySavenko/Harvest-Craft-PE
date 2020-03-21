var HarvestcraftCrop = $("HarvestCraftCrop", {
    extends: NormalCrop,
    blockType: CommonCrop,
    maxSize: 3,
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

var HarvestcraftAridGarden = $("HarvestcraftGarden", {
    extends: NormalBush,
    blockType: CommonSapling,
    farmlands: [{id: 12, data: -1}],
    maxSize: 1,
    __load__: function(){
        this.super.__load__();
    }
});