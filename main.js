let { generateBaseConstants } = require('./Constants');

let economyController = require('./Economy/_EconomyController');
let creepConstructionController = require('./Construction/_CreepConstructionController');

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    creepConstructionController(baseConstants);

    clearance();
}

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            // console.log('👻' + Memory.creeps[name].role + " creep has died.");
            delete Memory.creeps[name];
            // console.log('Clearing non-existing creep memory:', name);
        }
    }
}