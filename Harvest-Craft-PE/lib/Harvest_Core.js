//Harvest Core by Nikolay Savenko
//API level: 3.0

LIBRARY({
    name:"Harvest_Core",
    version: 10,
    shared: false,
    api:"CoreEngine"
});

IMPORT("CropLib");
//This bullshit was written many years ago
//Sorry for it...

var Flags = {
    allFlags: {},

    addFlag: function(name) {
        if (this.allFlags[name]) {
            return true;
        }
        else {
            this.allFlags[name] = true;
            return false;
        }
    },

    getFlag: function(name) {
        return this.allFlags[name] ? true : false;
    },

    addUniqueAction: function(name, action) {
        if (!this.addFlag(name)) {
            action();
        }
    },

    assertFlag: function(name) {
        if (!this.getFlag(name)) {
            Logger.Log("Assertion failed: flag '" + name + "' does not exist", "ERROR");
        }
    }
};

var BLOCK_TYPE_CROP = Block.createSpecialType({
    base: 59,
    opaque: false,
    rendertype: 6,
    lightopacity: 0,
    destroytime: 0
});
var BLOCK_TYPE_PLANT = Block.createSpecialType({
    base: 59,
    opaque: false,
    rendertype: 1,
    lightopacity: 0
});


var Random = {
    //Этот модуль облегчает генерацию случайных чисел
    Float:function(min,max){
        return Math.random() * (max - min) + min;
    },
    Int:function(min,max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
};

var Harvest = {
    toolList:{},
    //Этот модуль является сборником полезных методов для удобной работы с растениями и деревьями
    dropWithoutDirt:{},
    dropWithoutLeaves:{},
    grassDropsArray:[],
    getStringID:function(intID,isItem){
        var findFrom = isItem ? ItemID : BlockID;
        for(var id in findFrom){
            if(intID==findFrom[id]){
                alert(id+" "+findFrom[id]+" "+intID);
                return id;
            }
        }return null;
    },
    addGrassDrop:function(item){
        Harvest.grassDropsArray.push(item);
    },
    registerTool:function(tool){
        Harvest.toolList[tool] = true;
    },
    registerDroppingBlock:function(iiid){
        Callback.addCallback("DestroyBlock", function(coords, block, player){
            if(World.getBlockID(coords.x,coords.y+1,coords.z)==iiid){
                World.destroyBlock(coords.x, coords.y+1, coords.z,true);
                World.removeTileEntity(coords.x, coords.y+1, coords.z);
            }
        });
        Harvest.dropWithoutDirt[iiid] = true;
    },
    registerLeavesDroppingBlock:function(iiid){
        Callback.addCallback("DestroyBlock", function(coords, block, player){
            if(World.getBlockID(coords.x,coords.y-1,coords.z)==iiid){
                World.destroyBlock(coords.x, coords.y-1, coords.z,true);
                World.removeTileEntity(coords.x, coords.y-1, coords.z);
            }
        });
        Harvest.dropWithoutLeaves[iiid] = true;
    },
    setFood:function(id,name,food){
        IDRegistry.genItemID(id);
        Item.createFoodItem(id,name, {name: id, meta: 0}, {food: food});
        //Logger.Log("food:  "+id,"HCORE");
    },
    debugRecipe:function(id,ingredients){
        if(!id.id){
            alert("invalid recipe id: "+id.id);
        }
        for(var i in ingredients){
            if(!ingredients[i].id){
                alert("invalid ing: "+ingredients[i].id+"   in recipe of: "+id.id);
            }
        }
    },
    recipe:function(id,ingredients){
        if(ingredients){
            if(!id.count){
                id.count = 1;
            }
            if(!id.data){
                id.data = 0;
            }
            //Harvest.debugRecipe(id,ingredients);
            Callback.addCallback("LevelLoaded", function(){
                Recipes.addShapeless({id: id.id, count: id.count, data: id.data}, ingredients, function(api, field, result){
                    for (var i in field){
                        if (!Harvest.toolList[field[i].id]){
                            api.decreaseFieldSlot(i);
                        }
                    }
                });
            });
        }
    },
    recipeVariations:function(id,tool,ingredients){
        var rrecipes = [];
        if(!id.count){
            id.count = 1;
        }
        if(!id.data){
            id.data = 0;
        }
        for(var i in ingredients){
            for(var d in ingredients){
                if(ingredients[i]!=ingredients[d]){
                    rrecipes.push([{id:ingredients[i],data:0},{id:ingredients[d],data:0},{id: tool, data: 0}]);
                }
            }
        }
        Callback.addCallback("LevelLoaded", function(){
            for(var rec in rrecipes){
                Recipes.addShapeless({id: id.id, count: id.count, data: id.data}, rrecipes[rec],function(api, field, result){
                    for (var i in field){
                        if (!Harvest.toolList[field[i].id]){
                            api.decreaseFieldSlot(i);
                        }
                    }
                });
            }
        });
    },
    recipeDuoVariations:function(id,tool,ingredients){
        var rrecipes = [];
        if(!id.count){
            id.count = 1;
        }
        if(!id.data){
            id.data = 0;
        }
        for(var d in ingredients){
            rrecipes.push([{id:ingredients[d],data:0},{id: tool, data: 0}]);
        }
        Callback.addCallback("LevelLoaded", function(){
            for(var w in rrecipes){
                Recipes.addShapeless({id: id.id, count: id.count, data: id.data}, rrecipes[w], function(api, field, result){
                    for (var i in field){
                        if (!Harvest.toolList[field[i].id]){
                            api.decreaseFieldSlot(i);
                        }
                    }
                });
            }
        });
    },
    addBlockGeneration:function(block,biomes,cccount,chance){
        block.enabled = !Flags.addFlag(block.id.toString());

        Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
            if(Math.random() <chance&&block.enabled){
                var trueFarmlands = {};
                var count;
                if(typeof(cccount)=="object"){
                    count = Random.Int(cccount.min,cccount.max);
                }
                else if(typeof(cccount)=="string"){
                    count=cccount;
                }
                for(var ccount = 1;ccount<=count;ccount++){
                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 128);
                    coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
                    let cropClass =CropRegistry.getCropClass(block.id);
                    var farmlands = cropClass.getFarmlands();
                    if(farmlands){
                        for(var i in farmlands){
                            trueFarmlands[farmlands[i].id] = true;
                        }
                    }else{
                        trueFarmlands[World.getBlockID(coords.x, coords.y,coords.z)] = true;
                    }
                    if(biomes==null&&trueFarmlands[World.getBlockID(coords.x, coords.y, coords.z)]){
                        World.setBlock(coords.x, coords.y + 1, coords.z, block.id, block.data);
                        World.addTileEntity(coords.x, coords.y + 1, coords.z);
                        //if(block.id == BlockID.aridgarden) alert("ARID");
                        //alert("++ block");
                    }else{
                        for(var idd in biomes ){
                            var id = biomes[idd];
                            if((World.getBiome((chunkX + 0.5) * 16, (chunkZ + 0.5) * 16)==id)&&trueFarmlands[World.getBlockID(coords.x, coords.y, coords.z)]){
                                World.setBlock(coords.x, coords.y + 1, coords.z, block.id, block.data);
                                World.addTileEntity(coords.x, coords.y + 1, coords.z);
                                //alert("++ block");
                            }
                        }
                    }
                }
            }
        });
    },
    registerDrop:function(bl,itm){
        Block.registerDropFunction(bl, function(coords, blockID, blockData, level){
            return[[ itm,Random.Int(1,3),0 ]];
        });
    },
    registerDestroy:function(bl,itm){
        Block.registerDropFunction(bl, function(coords, blockID, blockData, level){
            return[[ itm, 1,0 ]];
        });
    },
    drop:function(id,count,coords){
        Entity.setVelocity(
            World.drop( coords.x ,  coords.y,   coords.z , id, count, 0),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2)
        );
    },
    dropFruit:function(id,x,y,z){
        Entity.setVelocity(
            World.drop( x , y,  z , id, Random.Int(1,3), 0),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2)
        );
    },
    dropPlant:function(id,x,y,z){
        Entity.setVelocity(
            World.drop( x , y,  z , id, 1 , 0),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2),
            Random.Float(-0.2,0.2)
        );
    },
    isFarmland:function(block){
        for(var classs in CropRegistry.cropClasses){
            var classObj = CropRegistry.cropClasses[classs];
            if(classObj.config){
                var farmlands = classObj.config.farmland;
                if(farmlands){
                    for(var farmlamdIndex in farmlands){
                        var farm = farmlands[farmlamdIndex];
                        if(farm.id==block.id&&farm.data==block.data){
                            return farm;
                        }
                    }
                }
            }
        }
        return null;
    }
};

function CropTexture(){
    this.textures = [];
    this.addTextures = function(count,name){
        for(var i = 0; i<count; i++){
            this.textures.push({name: name, texture: [["empty", 0],["empty", 0],[name, i]], inCreative: false});
        }
    };
    this.addTexture = function(texture){
        this.textures.push(texture);
    };
};

function TreePrototype(){
    this.structure = [];
    this.fruitsArea = [];
    this.validateStructure = function(){
        this.structure = [];
    };
    this.addBlock = function(structure){
        if(structure.id&&structure.x&&structure.y&&structure.z){
            if(!structure.data){
                structure.data = 0;
                this.structure.push(structure);
            }
            else{
                this.structure.push(structure);
            }
        }
    };
    this.addStructure = function(structure){
        for(var i in structure){
            var element = structure[i];
            var pos1 = element.box.pos1;
            var pos2 = element.box.pos2;
            if(pos1.x<=pos2.x&&pos1.y<=pos2.y&&pos1.z<=pos2.z){
                for(var xx = pos1.x; xx<=pos2.x;xx++){
                    for(var yy = pos1.y; yy<=pos2.y;yy++){
                        for(var zz = pos1.z; zz<=pos2.z;zz++){
                            var blockk = {id:element.id,data:element.data,x:xx,y:yy,z:zz};
                            this.structure.push(blockk);
                        }
                    }
                }
            }
            else{
                Logger.LogError("pos2 must be higher than pos1")
            }
        }
    };
    this.debugStructure = function(){
        for(var i in this.structure){
            var element = this.structure[i];
            alert("id: "+element.id+" x: "+element.x+" y: "+element.y+" z: "+element.z);
        }
    };
    this.debugFruits = function(){
        for(var i in this.fruitsArea){
            var element = this.fruitsArea[i];
            if(element.id){
                alert("id: "+element.id+" x: "+element.x+" y: "+element.y+" z: "+element.z);
            }
            else{
                alert(" x: "+element.x+" y: "+element.y+" z: "+element.z);
            }
        }
    };
    this.addFruitsArea = function(structure){
        for(var i in structure){
            var element = structure[i];
            var pos1 = element.box.pos1;
            var pos2 = element.box.pos2;
            if(pos1.x<=pos2.x&&pos1.y<=pos2.y&&pos1.z<=pos2.z){
                for(var xx = pos1.x; xx<=pos2.x;xx++){
                    for(var yy = pos1.y; yy<=pos2.y;yy++){
                        for(var zz = pos1.z; zz<=pos2.z;zz++){
                            if(element.id){
                                if(!element.data){
                                    element.data = 0;
                                    var blockk = {id:element.id,data:element.data,x:xx,y:yy,z:zz};
                                    this.fruitsArea.push(blockk);
                                }
                                else{
                                    var blockk = {id:element.id,data:element.data,x:xx,y:yy,z:zz};
                                    this.fruitsArea.push(blockk);
                                }
                            }
                            else{
                                var blockk = {x:xx,y:yy,z:zz};
                                this.fruitsArea.push(blockk);
                            }
                        }
                    }
                }
            }
            else{
                Logger.LogError("pos2 must be higher than pos1")
            }
        }
    };
    this.deploy = function(coords,activate,fruits){
        for(var i in this.structure){
            var element = this.structure[i];
            World.setBlock(coords.x+element.x,coords.y+element.y,coords.z+element.z,element.id,element.data);
            if(activate){
                World.addTileEntity(coords.x+element.x,coords.y+element.y,coords.z+element.z)
            }
        }
        for(var i in fruits){
            var fruit = fruits[i];
            for(var o = 0;o<fruit.count;){
                var element = this.fruitsArea[Random.Int(0,this.fruitsArea.length-1)];
                if(element.id&&element.data){
                    World.setBlock(coords.x+element.x,coords.y+element.y,coords.z+element.z,element.id,element.data);
                    if(activate){
                        World.addTileEntity(coords.x+element.x,coords.y+element.y,coords.z+element.z)
                    }
                    o++;
                }
                else{
                    if(World.getBlockID(coords.x+element.x,coords.y+element.y,coords.z+element.z)==0){
                        World.setBlock(coords.x+element.x,coords.y+element.y,coords.z+element.z,fruit.id,fruit.data);                   
                        if(activate){
                            World.addTileEntity(coords.x+element.x,coords.y+element.y,coords.z+element.z)
                        }
                        o++;
                    }
                }
            }
        }
    }
};

var TreeRegistry = {
    treeClasses:{/*
        "harvesTree":{
            proto: harvestTree
            deployFunc:function(treeClass){},
            config:{
                fruitCount:7
            }
            heirs:{
                "apple":{
                    sapling:{
                        item:ItemID.appleSapling,
                        block:BlockID.appleSapling
                    },
                    fruit:{
                        block:BlockID.apple,
                        item:260
                    }
                }
            }
        }
    */},
    registerClass:function(name){
        this.treeClasses[name] = {
            proto:null,
            logic:{},
            deriveFunc:null,
            deployFunc:function(){},
            config:{},
            heirs:{}
        };
    },
    deriveTreeAsClass:function(classs,tree){
        var cl = this.treeClasses[classs];
        if(cl){
            cl.heirs[tree.name] = {
                sapling:{
                    item:tree.sapling.item,
                    block:tree.sapling.block
                },
                fruit:{
                    item:tree.fruit.item,
                    block:tree.fruit.block
                }
            };
            if(cl.deriveFunc){
                cl.deriveFunc(cl);
            }
        }
    },
    deployTree:function(xx,yy,zz,tree){
        for(var i in this.treeClasses){
            var cllass = this.treeClasses[i];
            if(cllass){
                for(var y in cllass.heirs){
                    var ttree = cllass.heirs[y];
                    if(y==tree){
                        if(cllass.proto){
                            if(cllass.proto.deploy){
                                cllass.proto.deploy({x:xx,y:yy,z:zz},true,[{id:ttree.fruit.block,count:cllass.config.fruitCount,data:0}]);
                                if(cllass.deployFunc){
                                    cllass.deployFunc(cllass);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    addTreeGeneration:function(tree,biomes,countt,chance){
        countt.enabled = !Flags.addFlag(tree);
        Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
            if(Math.random() <chance&&countt.enabled){
                var count = 0;
                if(typeof(countt)=="object"){
                    count = Random.Int(countt.min,countt.max);
                }else{
                    count = countt;
                }
                for(var ccount = 1;ccount<=count;ccount++){
                    var coords = GenerationUtils.randomCoords(chunkX, chunkZ, 64, 128);
                    coords = GenerationUtils.findSurface(coords.x, coords.y, coords.z);
                    if(biomes==null){
                        TreeRegistry.deployTree(coords.x,coords.y,coords.z,tree);
                        //alert("++ tree");
                    }else{
                        for(var idd in biomes ){
                            var id = biomes[idd];
                            if((World.getBiome((chunkX + 0.5) * 16, (chunkZ + 0.5) * 16)==id)&&(World.getBlockID(coords.x, coords.y, coords.z) == 2)){
                                TreeRegistry.deployTree(coords.x,coords.y,coords.z,tree);
                            }
                        }
                    }
                }
            }
        });
    },
    registerClassDeploy:function(classs,func){
        this.treeClasses[classs].deployFunc = func;
    },
    registerClassConfig:function(classs,config){
        if(!config.fruitCount){
            config.fruitCount = 0
        }
        var cl = this.treeClasses[classs];
        cl.config = config;
    },
    registerClassPrototype:function(classs,pproto){
        var cl = this.treeClasses[classs];
        cl.proto = pproto;
    },
    getTreeFromSaplingBlock:function(block){
        for(var i in this.treeClasses){
            var cllass = this.treeClasses[i];
            for(var y in cllass.heirs){
                var ttree = cllass.heirs[y];
                if(ttree.sapling.block==block){
                    return y;
                }
            }
        }
    },
    getConfigFromTree:function(tree){
        for(var i in this.treeClasses){
            var cllass = this.treeClasses[i];
            for(var y in cllass.heirs){
                if(y==tree){
                    return cllass.config;
                }
            }
        }
    },
    generateStandartTreePrototypeWithParams:function(params){
        /*
            var params = {
                leaves:{
                    id:17,
                    data:0
                },
                wood:{
                    id:18,
                    data:0
                }
            }
        */
        if(params.leaves){
            if(!params.leaves.id){
                params.leaves.id = 0;
            }
            if(!params.leaves.data){
                params.leaves.data = 0;
            }
        }
        else{
            params.leaves = {id:17,data:0};
        }
        if(params.wood){
            if(!params.wood.id){
                params.wood.id = 0;
            }
            if(!params.wood.data){
                params.wood.data = 0;
            }
        }else{
            params.wood = {id:18,data:0};
        }
        var standartHarvestCraftTreePrototype = new TreePrototype();
        standartHarvestCraftTreePrototype.addStructure([{
            id: params.leaves.id,
            data:params.leaves.data,
            box:{
                pos1:{x:-2,y:3,z:-2},
                pos2:{x:2,y:4,z:2}
            }
        },
        {
            id: params.leaves.id,
            data:params.leaves.data,
            box:{
                pos1:{x:-1,y:5,z:0},
                pos2:{x:1,y:6,z:0}
            }
        },
        {
            id: params.leaves.id,
            data:params.leaves.data,
            box:{
                pos1:{x:0,y:5,z:-1},
                pos2:{x:0,y:6,z:1}
            }
        },
        {
            id: params.wood.id,
            data:params.wood.data,
            box:{
                pos1:{x:0,y:0,z:0},
                pos2:{x:0,y:5,z:0}
            }
        }]);
        standartHarvestCraftTreePrototype.addFruitsArea([{
            box:{
                pos1:{x:-2,y:2,z:-2}, 
                pos2:{x:2,y:2,z:2}
            }
        }]);
        return standartHarvestCraftTreePrototype;
    }
};

Callback.addCallback("DestroyBlock", function(coords, block, player){
    var trueIDs = {
        31:true,
        175:true
    };
    var trueMetaS = {
        1:true,
        2:true,
        10:true
    };
    if(trueIDs[block.id]&&trueMetaS[block.data]){
        var nn = Random.Int(0,400);
        if(nn<Harvest.grassDropsArray.length){
            Harvest.dropPlant(Harvest.grassDropsArray[nn],coords.x,coords.y,coords.z);
        }
    }
});
Callback.addCallback("ItemUse", function(coords, item, block){
    var trueTool = {
        290:true,
        291:true,
        292:true,
        293:true,
        294:true
    };
    if(block.id==2&&trueTool[item.id]){
        var nn = Random.Int(0,400);
        if(nn < Harvest.grassDropsArray.length){
            Harvest.dropPlant(Harvest.grassDropsArray[nn],coords.x,coords.y+1,coords.z);
        }
    }
});

EXPORT("Random", Random);
EXPORT("Harvest", Harvest);
EXPORT("CropTexture", CropTexture);
EXPORT("TreePrototype", TreePrototype);
EXPORT("TreeRegistry", TreeRegistry);