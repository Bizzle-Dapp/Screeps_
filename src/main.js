import generateBaseConstants from './Constants';

import economyController from './Economy/_EconomyController';
import logisticsContorller from './Logistics/_LogisticsController';
import creepConstructionController from './Construction/_CreepConstructionController';

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    logisticsContorller(baseConstants);
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