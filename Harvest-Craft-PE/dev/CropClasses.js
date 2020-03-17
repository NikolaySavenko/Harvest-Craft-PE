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