import { generateBaseConstants } from './Constants';

import economyController from './Economy/_EconomyController';
import creepConstructionController from './Construction/_CreepConstructionController';

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    creepConstructionController(baseConstants);

    clearance();
}

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}