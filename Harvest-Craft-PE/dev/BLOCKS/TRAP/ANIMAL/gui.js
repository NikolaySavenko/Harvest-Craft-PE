var elementsForTrap = {};
elementsForTrap["slotBait"] = {type: "slot", x: 408, y: 173, size: 71, bitmap: "slot", isTransparentBackground: true};
for(let i = 0; i < 18; i++){
	let x = i % 9;
    let y = Math.floor(i / 9) + 1;
	elementsForTrap["slot" + i] = {type:"slot", x: 553 + 72 * x, y: 103 + 72 * y, size: 71, bitmap: "slot", isTransparentBackground: true}
}

var animalTrapGUI = new UI.StandartWindow({
	standart: {
        header: {
            text: {
                text:"AnimalTrap"
            }
        },
        inventory: {
            standart: true
        },
        background: {
            standart: true
        }
	},

    drawing: [
		{type: "bitmap", bitmap: "groundtrap", x: 320, y: 70, scale: 4}
	],

    elements: elementsForTrap
});