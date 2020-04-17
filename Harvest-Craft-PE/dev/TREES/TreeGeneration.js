let treesList = {

    normal: [
        "cherry",
        "avocado"
    ],

    tropical: [
        "persimmon",
        "pear",
        "peach",
        "papaya",
        "orange",
        "olive",
        "mango",
        "lime",
        "lemon",
        "gooseberry",
        "grapefruit",
        "fig",
        "dragonfruit",
        "date",
        "banana",
        "apricot",
        "coconut",
        "cashew",
        "peppercorn",
        "almond",
        "starfruit",
        "pomegranate",
        "plum"
    ]
};

let TreeGenerator = {

    generateSaplingItem: function(treeName){
        let id = treeName + "Sapling"
        IDRegistry.genItemID(id);
        Item.createItem(id, treeName[0].toUpperCase() + treeName.slice(1) + " Tree Sapling", {name: id, data: 0});
        return ItemID[id];
    },

    generateSapling: function(treeName){
        CropRegistry.create(HarvestcraftSapling, {
            id: treeName + "TreeSapling",
            texture: treeName + "Sapling",
            creative: false,
            seed: {
                id: ItemID[treeName + "Sapling"],
                decrease: true
            }
        });
        return BlockID[treeName + "TreeSapling"];
    },

    generateFruitItem: function(treeName){
        let name = treeName[0].toUpperCase() + treeName.slice(1);
        Harvest.setFood(treeName, name ,1);
        return ItemID[treeName]
    },

    generateFruit: function(treeName){
        let regID = treeName;
        CropRegistry.create(HarvestcraftFruit, {
            id: regID,
            creative: false,
            products: [{id: ItemID[treeName], count: {min: 1, max: 3}, data: 0}]
        });
        return BlockID[regID];
    },

    registerTree: function(treeName, sapItem, sapBlock, fruitItem, fruitBlock){
        TreeRegistry.deriveTreeAsClass("Harvestcraft_jungleFruitTree",{
            name: treeName,
            sapling:{
                block: sapBlock,
                item: sapItem
            },
            fruit:{
                block: fruitBlock,
                item: fruitItem
            }
        });
        //alert(treeName + " " +sapItem+ " "+sapBlock+" "+fruitItem+ " "+ fruitBlock);
    },

    generateTree: function(treeName, saplingData){
        let saplingItem = this.generateSaplingItem(treeName);
        let saplingBlock = this.generateSapling(treeName);
        let fruitItem = this.generateFruitItem(treeName);
        let fruitBlock = this.generateFruit(treeName)
        Harvest.recipe({id: saplingItem},[{id: ItemID[treeName], data: 0}, {id: 6, data: saplingData}]);
        this.registerTree(treeName, saplingItem, saplingBlock, fruitItem, fruitBlock);
    },

    generateTrees: function(){
        for(let i in treesList.tropical){
            let treeName = treesList.tropical[i];
            this.generateTree(treeName, 3);
        }
        for(let i in treesList.normal){
            let treeName = treesList.normal[i];
            this.generateTree(treeName, 0);
        }
    }
};
TreeGenerator.generateTrees();

//APPLE
let saplingApple = TreeGenerator.generateSaplingItem("apple");

CropRegistry.create(HarvestcraftFruit, {
    id: "appleBlock",
    creative: false,
    products: [{id:260, count: {min: 1, max: 3}, data: 0}]
});

CropRegistry.create(HarvestcraftSapling, {
    id: "appleTreeSapling",
    texture: "appleSapling",
    creative: false,
    seed: {
        id: saplingApple,
        decrease: true
    }
});

TreeRegistry.deriveTreeAsClass("Harvestcraft_middleFruitTree",{
	name: "apple",
	sapling:{
		block: BlockID["appleTreeSapling"],
		item: saplingApple
	},
	fruit:{
		block: BlockID["appleBlock"],
		item: 260
	}
});
Harvest.recipe({id: saplingApple},[{id: 260, data: 0}, {id: 6, data: 0}]);