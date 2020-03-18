var cropList = [
    "blackberry",
    "blueberry",
    "candleberry",
    "raspberry",
    "strawberry",
    "cactusfruit",
    "asparagus",
    "barley",
    "oats",
    "rye",
    "corn",
    "bambooshoot",
    "cantaloupe",
    "cucumber",
    "wintersquash",
    "zucchini",
    "beet",
    "onion",
    "parsnip",
    "peanut",
    "radish",
    "rutabaga",
    "sweetpotato",
    "turnip",
    "rhubarb",
    "celery",
    "garlic",
    "ginger",
    "spiceleaf",
    "tealeaf",
    "coffeebean",
    "mustardseeds",
    "broccoli",
    "cauliflower",
    "leek",
    "lettuce",
    "scallion",
    "artichoke",
    "brusselsprout",
    "cabbage",
    "spinach",
    "whitemushroom",
    "bean",
    "soybean",
    "bellpepper",
    "chilipepper",
    "eggplant",
    "okra",
    "peas",
    "tomato",
    "cotton",
    "pineapple",
    "grape",
    "kiwi",
    "cranberry",
    "rice",
    "seaweed",
    "curryleaf",
    "sesameseeds",
    "waterchestnut",
    "gigapickle",
    "kale",
    "agave",
    "amaranth",
    "arrowroot",
    "cassava",
    "chickpea",
    "elderberry",
    "flax",
    "greengrape",
    "huckleberry",
    "jicama",
    "jute",
    "kenaf",
    "kohlrabi",
    "lentil",
    "millet",
    "mulberry",
    "quinoa",
    "sisal",
    "taro",
    "tomatillo",
    "juniperberry"
];

var CropGenerator = {

    crops: { //TODO write this data
        //"blackberry": {seed: "blackberryseed", item: "blackberry"}
    },

    registerCrop: function(cropName){
        let seedID = CropGenerator.genSeed(cropName);
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

    genSeed: function(cropName){
        let stringID = cropName + "seed";
        let name = CropGenerator.getRegistryName(cropName) + " Seed";
        let textureName = cropName + "seed";

        IDRegistry.genItemID(stringID);
        Item.createItem(stringID, name, {name: textureName, data: 0});

        let numerlicID = ItemID[stringID];
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