var jsonDirectory = __dir__ + "recipes/recipesNew.json";
var file = FileTools.ReadText(jsonDirectory);
var ItemGenerator = {
    items: foodRecipes,
    counter: 0,
    generateItems: function(){
        for(let i in this.items){
            let obj = this.items[i];
            let stringID = obj.name;
            if(!this.isNativeItem(stringID) && !this.isAlreadyExist(stringID)){
                //alert("gen " + stringID);
                this.genFoodItem(stringID, obj.restore);
            }
        }
        alert(this.counter);
    },

    genFoodItem: function(stringID, restore){
        let name = this.getItemName(stringID);
        IDRegistry.genItemID(stringID);
        Item.createFoodItem(stringID, name, {name: stringID, meta: 0}, {food: restore});
        this.counter++;
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

//ItemGenerator.generateItems();