var biomesTypes = {
	middleBiomes: [1,4,3,132,129,34, 18, 27, 28,13],
	savannaBiomes: [1,2,4, 18, 27, 28,13],
	taigaBiomes: [35,163,39,36,164, 167]
};

var treeBiomes = {

	middleBiomes: [
		"apple",
		"cherry",
		"avocado"
	],

	savannaBiomes: [
		"persimmon",
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
	],

	taigaBiomes: [
		"pear"
	]
};

for(let i in treeBiomes){
	let biomeType = treeBiomes[i];
	for(let j in biomeType){
		let name = biomeType[j];
		var treeCount = {
			min:__config__.access("generation.group.trees." + name + ".min"),
			max:__config__.access("generation.group.trees." + name + ".max"),
			enabled:true
		};
		let biomes = biomesTypes[i]
		TreeRegistry.addTreeGeneration(name, biomes , treeCount,__config__.access("generation.numbers.trees." + name));
	}
}