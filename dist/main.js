'use strict';

const spawnerRooms = ['W6N1'];

/**
 * Returns key base information
 */
const generateBaseConstants = () => {
    // Once we have multiple spawns, pass key/value pairs including nearby resources related to each spawner
    let mainSpawn = Game.rooms[spawnerRooms[0]]
                    .find(FIND_MY_STRUCTURES)
                    .filter((s) => s.structureType == 'spawn')[0];
    let potentialResource = Game.rooms[spawnerRooms[0]].find(FIND_SOURCES_ACTIVE);
    
    return {
        mainSpawn,
        potentialResource
    }
};

function harvest$1(baseConstants) {
    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    // Move Harvester to location, harvest, then return to spawn and diposit
    harvesters.forEach((creep) => {
        if(!creep.memory.task){
            creep.memory.task = "IDLE";
        }
        if (creep.store.getFreeCapacity() > 0) ;
        if (creep.harvest(baseConstants.potentialResource[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(
                baseConstants.potentialResource[creep.memory.resourceDivide],
                {
                    visualizePathStyle: { stroke: '#ffaa00' }
                });
        }
        if (creep.transfer(baseConstants.mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(baseConstants.mainSpawn, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    });
}

var HarvesterActions = harvest$1;

function upgrade$1(baseConstants) {
    let upgraders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'upgrader');
    // Move Harvester to location, harvest, then return to spawn and diposit
    upgraders.forEach((creep) => {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄harvest', true);
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() === 0){
            creep.memory.upgrading = true;
            creep.say('💪upgrade', true);
        }
        if (!creep.memory.upgrading && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
            if (creep.harvest(baseConstants.potentialResource[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    baseConstants.potentialResource[creep.memory.resourceDivide], 
                    { visualizePathStyle: { stroke: '#ffaa00' } 
                });
            }
        } else {
            if(creep.room.controller) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,
                        { visualizePathStyle: { stroke: '#ffaa00' }
                    });
                }
            }
        }
    });
}

var UpgraderActions = upgrade$1;

let harvest = HarvesterActions;
let upgrade = UpgraderActions;

function economyController(baseConstants) {
    harvest(baseConstants);
    upgrade(baseConstants);
}

var _EconomyController = economyController;

function harvesterConstruction(baseConstants) {
    // Spawn a Harvester
    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 4) {
        let id = Date.now();
        baseConstants.mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Worker-${id.toString()}`, {
            memory: { role: 'harvester', resourceDivide: (harvesters.length % 2)  }
        });
    }
}

function upgraderConstruction(baseConstants) {
    // Spawn an Upgrader
    let upgraders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let id = Date.now();
        baseConstants.mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Upgrader-${id.toString()}`, {
            memory: { role: 'upgrader', resourceDivide: (upgraders.length % 2)  }
        });
    }
}

function CreepConstructionController(baseConstants) {
    
    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    _EconomyController(baseConstants);
    CreepConstructionController(baseConstants);

    clearance();
};

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}
//# sourceMappingURL=main.js.map
