var Harvest = {
    toolList:{},
    //Этот модуль является сборником полезных методов для удобной работы с растениями и деревьями
    dropWithoutLeaves:{},
    grassDropsArray:[],
    getStringID: function(intID,isItem){//TODO rewrite
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

    registerLeavesDroppingBlock:function(iiid){
        Callback.addCallback("DestroyBlock", function(coords, block, player){
            if(World.getBlockID(coords.x,coords.y-1,coords.z)==iiid){
                World.destroyBlock(coords.x, coords.y-1, coords.z,true);
                World.removeTileEntity(coords.x, coords.y-1, coords.z);
            }
        });
        Harvest.dropWithoutLeaves[iiid] = true;
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