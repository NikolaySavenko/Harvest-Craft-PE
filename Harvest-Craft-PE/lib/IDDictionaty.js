LIBRARY({
    name: "IDDictionary",
    version: 1,
    shared: true,
    api: "CoreEngine"
});

var IDDictionary = {
    resTypes: {
        //"someType" : [{id: 32, data: -1}]
    },

    recipes:0,

    createType: function(type){
        this.resTypes[type] = [];
    },

    assignResource: function(type, item){
        //alert(item);
        if(!item) return;
        if(!this.resTypes[type]) this.createType(type);

        if(typeof(item) == "number"){
            item = {id: item, data: 0};
        }
        //alert(item.id + "   "+type);
        this.resTypes[type].push(item);
    },

    assignList: function(type, list){
        for(let i in list){
            let element = list[i];
            this.assignResource(type, element);
        }
    },

    is: function(item, type){
        let res = this.resTypes[type];
        if(res){
            for(let i in res){
                let obj = res[i];
                if(obj.id == item.id && (obj.data == -1 || obj.data == item.data)){
                    return true;
                }
            }
        }
        return false;
    },

    getResourceByType: function(type){
        return this.resTypes[type] || [];
    },

    addShapeless: function(result, ingredients, func){
        for(let i in ingredients){
            let ingredient = ingredients[i];
            if(typeof(ingredient) == "string"){
                ingredient = this.getResourceByType(ingredient);
                for(let t in ingredient){
                    let variation = ingredient[t];
                    let variationsToNew = this.getIngredientsForShapeless(ingredients, i, variation);
                    this.addShapeless(result, variationsToNew, func);
                }
                return;
            }
            if(!ingredient){
                alert("holy shit "+ result.id);
                return;
            }
        }
        this.recipes++;
        alert(this.recipes);
        //alert("for "+result.id);
        //alert(JSON.stringify(ingredients));
        Recipes.addShapeless(result, ingredients, func);
    },

    getIngredientsForShapeless: function(ingredients, i, variation){
        let newVariations = ingredients.slice();
        newVariations[i] = variation;
        return newVariations;
    },

    addShaped: function(result, grid, ingredients, func){
        for(let i = 1; i < 29; i += 3){
            let ingredient = ingredients[i];
            if(typeof(ingredient) == "string"){
                ingredient = this.getResourceByType(ingredient);
                for(let t in ingredient){
                    let variation = ingredient[t];
                    let variationsToNew = this.getIngredientsForShaped(ingredients, i, variation);
                    this.addShaped(result, grid, variationsToNew, func);
                }
                return;
            }
        }
        Recipes.addShaped(result, grid, ingredients, func);
    },

    getIngredientsForShaped: function(ingredients, i, variation){
        let newVariations = ingredients.slice();
        newVariations[i] = variation.id;
        newVariations.splice(i + 1, 0, variation.data || 0);
        return newVariations;
    }
};

/*
IDDictionary.assignResource("wood", {id: 5, data: 0});
IDDictionary.assignResource("wood", {id: 8, data: 0});
IDDictionary.assignResource("wood", {id: 6, data: 0});

IDDictionary.assignResource("steel", {id: 265, data: 0});
IDDictionary.assignResource("steel", {id: 53, data: 0});
IDDictionary.addShaped({id: 1, data: 0}, [
    "xxx",
    "xxx",
    "xxy"
], ['x', "wood", 'y', "steel"]);
IDDictionary.addShapeless({id: 265, data: 0},["wood", "steel"]);

*/

EXPORT("IDDictionary", IDDictionary);