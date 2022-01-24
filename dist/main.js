'use strict';

const SPAWNER_ROOMS = Object.values(Game.spawns).map((v) => v.room.name);

/**
 * Returns key base information
 */
const generateBaseConstants = () => {
    // Once we have multiple spawns, pass key/value pairs including nearby resources related to each spawner
    const MAIN_SPAWN = Game.rooms[SPAWNER_ROOMS[0]]
        .find(FIND_MY_STRUCTURES)
        .filter((s) => s.structureType == STRUCTURE_SPAWN)[0];

    const POTENTIAL_RESOURCE = Game.rooms[SPAWNER_ROOMS[0]].find(FIND_SOURCES_ACTIVE);

    return {
        MAIN_SPAWN,
        SPAWNER_ROOMS,
        POTENTIAL_RESOURCE
    }
};

function harvest(baseConstants) {
    const { MAIN_SPAWN, POTENTIAL_RESOURCE } = baseConstants;

    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    // Move Harvester to location, harvest, then return to spawn and deposit
    harvesters.forEach((creep) => {
        if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.harvesting = true;
            creep.say('🔄harvest', true);
        }
        if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
            creep.memory.harvesting = false;
            creep.say('💲banking', true);
        }
        if (creep.memory.harvesting && creep.harvest(POTENTIAL_RESOURCE[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(
                POTENTIAL_RESOURCE[creep.memory.resourceDivide],
                { visualizePathStyle: { stroke: '#ffaa00' } });

        }
        if (!creep.memory.harvesting) {
            MAIN_SPAWN.room.find(FIND_MY_STRUCTURES, {
                filter: (i) => ((i.structureType == STRUCTURE_CONTAINER) &&
                    i.store.getFreeCapacity() > 0)
            });
            
            if (creep.transfer(MAIN_SPAWN, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(MAIN_SPAWN,
                    { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    });
}

function economyController(baseConstants) {
    harvest(baseConstants);
}

const upgrade = (baseConstants) => {
    const { POTENTIAL_RESOURCE } = baseConstants;

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
            if (creep.harvest(POTENTIAL_RESOURCE[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    POTENTIAL_RESOURCE[creep.memory.resourceDivide], 
                    { visualizePathStyle: { stroke: '#ffaa00' } 
                });
            }
        } else {
            if(creep.room.controller) {

                if(creep.room.controller.sign.username !== 'Bizzle_Dapp'
                    && creep.signController(creep.room.controller, "Our Territory") == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,
                        { visualizePathStyle: { stroke: '#ffaa00' }
                    });
                }
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller,
                        { visualizePathStyle: { stroke: '#ffaa00' }
                    });
                }
            }
        }
    });
};

function logisticsController(baseConstants) {
    upgrade(baseConstants);
}

function harvesterConstruction(baseConstants) {
    const { MAIN_SPAWN } = baseConstants;
    // Spawn a Harvester
    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 4) {
        let id = Date.now();
        MAIN_SPAWN.spawnCreep([WORK, CARRY, MOVE], `Worker-${id.toString()}`, {
            memory: { role: 'harvester', resourceDivide: (harvesters.length % 2)  }
        });
    }
}

function upgraderConstruction(baseConstants) {
    const { MAIN_SPAWN } = baseConstants;
    // Spawn an Upgrader
    let upgraders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let id = Date.now();
        MAIN_SPAWN.spawnCreep([WORK, CARRY, MOVE], `Upgrader-${id.toString()}`, {
            memory: { role: 'upgrader', resourceDivide: (upgraders.length % 2)  }
        });
    }
}

function populationController(baseConstants) {
    

    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    logisticsController(baseConstants);
    populationController(baseConstants);

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
