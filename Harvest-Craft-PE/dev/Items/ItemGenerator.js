var jsonDirectory = __dir__ + "recipes/recipesNew.json";
var file = FileTools.ReadText(jsonDirectory);

var toolList = [
    "cuttingboard",
    "pot",
    "skillet",
    "saucepan",
    "bakeware",
    "mixingbowl",
    "mortarandpestle",
    "juicer"
];

var ItemGenerator = {
    items: null,

    registerJuices: function(list){
        for(let i in list){
            let id = list[i];
            this.registerFood(id, 2);
        }
    },

    genTools: function(){
        Harvest.registerTool(325);
        for(let i in toolList){
            let id = toolList[i];
            IDRegistry.genItemID(id);//TODO adapt for translate
            Item.createItem(id, id, {name: id, meta: 0}, {stack: 1});
            Harvest.registerTool(Item[id]);
        }
    },

    registerFood:function(id, food){
        IDRegistry.genItemID(id);
        Item.createFoodItem(id, id, {name: id, meta: 0}, {food: food});
        //Logger.Log("food:  "+id,"HCORE");
    },

    registerTopTierFood: function(id, food){
        this.registerFood(id, food);
        //TODO add effects
    },

    registerGenericItem: function(id){
        IDRegistry.genItemID(id);
        Item.createItem(id, id, {name: id, data: 0});
    },

    registerPotionFood: function(id, food){
        this.registerFood(id, food);
    },

    isAlreadyExist: function(stringID){
        alert(stringID + "    "+Item.getName(ItemID[stringID]));
        return Item.getName(ItemID[stringID]);
    },

    getItemName: function(stringID){
        return "item." + stringID + ".name";
    },

    isNativeItem: function(stringID){
        if(stringID.indexOf("minecraft:") != -1) return true;
        return false;
    }
};

ItemGenerator.genTools();