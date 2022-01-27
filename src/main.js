import generateBaseConstants from './Constants';

import economyController from './Economy/_EconomyController';
import logisticsController from './Logistics/_LogisticsController';
import populationController from './Population/_PopulationController';
import constructionController from './Construction/_ConstructionController';

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    logisticsController(baseConstants);
    populationController(baseConstants);
    constructionController(baseConstants);
    clearance();
}

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}