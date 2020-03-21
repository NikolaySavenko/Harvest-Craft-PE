let rec = JSON.parse(prompt("input recipes"));
for(let t in rec){
    let itemCategory = rec[t];
    for(let i in itemCategory){
        let recipeObj = itemCategory[i];
        recipeObj.recipe = [];
        for(let j = 0; j < 7; j++){
            let key = "Ingredient" + j;
            if(recipeObj[key]){
                recipeObj.recipe.push(recipeObj[key]);
            }
        }
    }
}
let jsn = JSON.stringify(rec);
console.log(jsn);
////////////////////////

let rec = JSON.parse(prompt("input recipes"));
for(let t in rec){
    let itemCategory = rec[t];
    for(let i in itemCategory){
        let recipeObj = itemCategory[i];
        for(let j = 0; j < 8; j++){
            let key = "Ingredient" + j;
            if(recipeObj[key]){
                recipeObj[key] = null;
            }
        }
    }
}
let jsn = JSON.stringify(rec);
console.log(jsn);

/////////////////////

let nativeRecipes = [];
let rec = JSON.parse(prompt("input recipes"));
for(let t in rec){
    let itemCategory = rec[t];
    for(let i in itemCategory){
        let recipeObj = itemCategory[i];
        //console.log(recipeObj.name);
        let name = recipeObj.name;
        if(name.indexOf("minecraft:") != -1){
            console.log("recipe for " + name);
            if(nativeRecipes.indexOf(name) == -1){
                nativeRecipes.push(name);
            }
        }
        for(let k in recipeObj.recipe){
            let ingred = recipeObj.recipe[k];
            if(ingred.indexOf("minecraft:") != -1){
                console.log("ingredient is " + ingred);
                if(nativeRecipes.indexOf(ingred) == -1){
                    nativeRecipes.push(ingred);
                }
            }
        }
    }
}
let jsn = JSON.stringify(rec);
console.log(nativeRecipes);