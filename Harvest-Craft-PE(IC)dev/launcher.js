var modsAPI = {};
ModAPI.addAPICallback("ForestryAPI", function(api){
    modsAPI.ForestryAPI = api;
});
ModAPI.addAPICallback("BuildcraftAPI", function(api){
    modsAPI.BuildcraftAPI = api;
});
Launch({
    modsAPI: modsAPI
});