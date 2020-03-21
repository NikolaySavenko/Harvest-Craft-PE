var CropGenerator = {

    crops: { //TODO write this data
        //"blackberry": {seed: "blackberryseed", item: "blackberry"}
    },

    registerGardens: function(){
        for(let name in gardenList){
            this.registerGarden(name);
        }
    },

    registerGarden: function(gardenName){
        let products = this.getProductsForGarden(gardenName);
        let placeItem = this.genGardenSeed(gardenName);
        let cls = this.getGardenClass(gardenName);
        CropRegistry.create(cls, {
            id: gardenName,
            creative: false,
            seed: {
                id: placeItem,
                decrease: true
            },
            products: products
        });
    },

    getGardenClass: function(gardenName){
        if(gardenName == "aridgarden") return HarvestcraftAridGarden;
        return HarvestcraftGarden;
    },

    genGardenSeed: function(gardenName){
        let name = CropGenerator.getRegistryName(gardenName);

        IDRegistry.genItemID(gardenName);
        Item.createItem(gardenName, name, {name: gardenName, data: 0});

        let numerlicID = ItemID[gardenName];
        return numerlicID;
    },

    getProductsForGarden: function(gardenName){
        let gardenProd = gardenList[gardenName];
        let products = [];
        for(let i in gardenProd){
            let stringID = gardenProd[i];
            let productID = this.getNumerlicID(stringID);
            products.push({id: productID, count: {min: 1, max: 3}, data: 0});
        }
        return products;
    },

    getNumerlicID: function(stringID){
        if(stringID.indexOf("minecraft:") != -1){
            stringID = stringID.replace("minecraft:", "");
            return VanillaItemID[stringID] || VanillaBlockID[stringID]
        }
        return ItemID[stringID];
    },

    registerCrop: function(cropName){
        let seedID = CropGenerator.genCropSeed(cropName);
        let product = CropGenerator.genProduct(cropName);
        CropRegistry.create(HarvestcraftCrop, {
            id: cropName + "_crop",
            texture: cropName + "_stage",
            creative: false,
            seed: {
                id: seedID,
                decrease: true
            },
            products: [{id: product, count: {min: 0, max: 3}, data: 0}]
        });
        //alert("Crop registred " + cropName + "_crop "+ "seed " + seedID + " product "+ product);
    },

    registerCrops: function(){
        for(let i in cropList){
            let name = cropList[i];
            CropGenerator.registerCrop(name);
        }
    },

    genCropSeed: function(cropName){
        let stringID = cropName + "seed";
        let name = CropGenerator.getRegistryName(cropName) + " Seed";
        let textureName = cropName + "seed";

        IDRegistry.genItemID(stringID);
        Item.createItem(stringID, name, {name: textureName, data: 0});

        let numerlicID = ItemID[stringID];
        Harvest.addGrassDrop(numerlicID);

        return numerlicID;
    },

    getRegistryName: function(cropName){
        if (!cropName) return cropName;

        return cropName[0].toUpperCase() + cropName.slice(1);
    },

    genProduct: function(cropName){
        let name = CropGenerator.getRegistryName(cropName);

        IDRegistry.genItemID(cropName);
        Item.createItem(cropName, name, {name: cropName, data: 0});

        let numerlicID = ItemID[cropName];
        return numerlicID;
    }
};

CropGenerator.registerCrops();
CropGenerator.registerGardens();