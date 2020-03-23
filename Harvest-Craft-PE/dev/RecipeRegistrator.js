var RecipeRegistrator = {
    food: foodRecipes,

    registerAll: function(){
        for(let i in this.food){
            let element = this.food[i];
            //alert("trying to "+element.name);
            let result = ItemID[element.name];
            if(!result){
                alert("fail "+ element.name);
                continue;
            }
            let ingredients = this.getIngredients(element);
            IDDictionary.addShapeless({id: result, data: 0}, ingredients, function(api, field, result){
                for (var i in field){
                    if (!Harvest.toolList[field[i].id]){
                        api.decreaseFieldSlot(i);
                    }
                }
            });
        }
    },

    getIngredients: function(element){
        let ingredients = element.recipe.slice();
        ingredients.push(element.tool);
        //Debug.m(ingredients);
        return ingredients;
    }
};

Callback.addCallback("PreLoaded", function(){
    RecipeRegistrator.registerAll();
});
