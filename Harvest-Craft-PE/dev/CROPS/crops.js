// file: CROPS/spiceleaf.js
CropRegistry.create(HarvestcraftCrop, {
    id: "spiceleafcrop",
    creative: false,
    seed: {
        id: ItemID.spice_leaf_seed,
        decrease: true
    },
    products: [{id: ItemID.spice_leaf, count: {min: 1, max: 3}, data: 0}]
});
// file: CROPS/chilipepper.js

CropRegistry.create(HarvestcraftCrop, {
    id: "chilipeppercrop",
    creative: false,
    seed: {
        id: ItemID.chili_pepper_seed,
        decrease: true
    },
    products: [{id: ItemID.chili_pepper, count: {min: 1, max: 3}, data: 0}]
});

// file: CROPS/coffeebean.js
CropRegistry.create(HarvestcraftCrop, {
    id: "coffeebeancrop",
    creative: false,
    seed: {
        id: ItemID.coffee_seed,
        decrease: true
    },
    products: [{id: ItemID.coffee_beans, count: {min: 1, max: 3}, data: 0}]
});

var cropList = [
    "strawberry",
    "raspberry",
    "cranberry",
    "blueberry",
    "blackberry",
    "grape",
    "cucumber",
    "onion",
    "cabbage",
    "tomato",
    "rhubarb",
    "garlic",
    "bellpepper",
    "lettuce",
    "peas",
    "corn",
    "candleberry",
    "curryleaf",
    "cotton",
    "rutabaga",
    "bean",
    "waterchestnut",
    "rice",
    "mustard",
    "ginger",
    "spinach",
    "cactusfruit",
    "cantaloupe",
    "kiwi",
    "pineapple",
    "artichoke",
    "asparagus",
    "bambooshoot",
    "broccoli",
    "brusselsprout",
    "cauliflower",
    "celery",
    "radish",
    "eggplant",
    "leek",
    "okra",
    "parsnip",
    "scallion",
    "soybean",
    "sweetpotato",
    "turnip",
    "peanut",
    "rye",
    "zucchini",
    "barley",
    "oats",
    "wintersquash",
    "tealeaf",
    "beet"
];

for(let i in cropList){
    let crop = cropList[i];
    CropRegistry.create(HarvestcraftCrop, {
        id: crop + "crop",
        creative: false,
        seed: {
            id: ItemID[crop + "_seed"],
            decrease: true
        },
        products: [{id: ItemID[crop], count: {min: 1, max: 3}, data: 0}]
    });
};