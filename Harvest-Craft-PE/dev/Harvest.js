var Harvest = {
    toolList:{},
    //Этот модуль является сборником полезных методов для удобной работы с растениями и деревьями
    dropWithoutLeaves:{},
    grassDropsArray: [],

    addGrassDrop:function(item){
        Harvest.grassDropsArray.push(item);
    },

    registerTool:function(tool){
        Harvest.toolList[tool] = true;
    },

    addBlockGeneration:function(block,biomes,cccount,chance){//TODO rewrite
        block.enabled = !Flags.addFlag(block.id.toString());

        Callback.addCallback("GenerateChunk", function(chunkX, chunkZ){
            if(Math.random() <chance && block.enabled){
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
                    var farmlands = CropRegistry.getFarmlandsFromCrop(block.id);
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
    }
};
var dropSeedChance = .1;
Callback.addCallback("DestroyBlock", function(coords, block, player){
    if(Math.random() < dropSeedChance){
        let max = Harvest.grassDropsArray.length - 1;
        let id = Harvest.grassDropsArray[Random.Int(0, max)];
        alert("drop seed");
        World.drop(coords.x, coords.y, coords.z, id, 1, 0);
    }
});