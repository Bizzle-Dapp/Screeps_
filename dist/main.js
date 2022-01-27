'use strict';

var _$1 = require('lodash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ___default = /*#__PURE__*/_interopDefaultLegacy(_$1);

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

/**
 * Determines and returns buildable positions around the spawner
 * @param {{"MAIN_SPAWN": Spawner}} baseConstants - An object of constant defined values specific to the base
 * @param {number} radius - A numeric value to check around the spawn in each direction
 * @returns {[{"x": number, "y": number}]} An array of buildable x,y coordinate objects
 */
const spawnAreaConstructionAnalyser = (baseConstants, radius) => {
    const { MAIN_SPAWN } = baseConstants;

    const room = Game.rooms[MAIN_SPAWN.room.name];
    // Scan area
    const scannedArea = room.lookAtArea(
        MAIN_SPAWN.pos.y - radius,
        MAIN_SPAWN.pos.x - radius,
        MAIN_SPAWN.pos.y + radius,
        MAIN_SPAWN.pos.x + radius,
        true
    );
    // Create an ignore list of all positions occupied by something other than terrain
    const ignoreList = [];
    ___default["default"].forEach(scannedArea.filter(x => x.type !== 'terrain'), x => {
        ignoreList.push({ x: x.x, y: x.y });
    });
    // Filter the scannedArea of any positions contained in the ignoreList
    const filteredArea = [];
    ___default["default"].forEach(scannedArea.filter(x => x.type === 'terrain' && x.terrain === 'plain'), x => {
        if (!ignoreList.find(y =>  y.x == x.x && y.y == x.y)) {
            filteredArea.push(x);
        }    });
    // Display our available locations
    filteredArea.forEach((areaDetails) => {
        room.visual.circle(areaDetails.x, areaDetails.y,
            {
                fill: 'transparent',
                radius: 0.1,
                stroke: 'green'
            });
    });

    return filteredArea
};

/**
 * -- Rules for a successful base; Part 1.1 -- 
[1] Only use odd x/y values for STRUCTURES: 
Circumvents the chance of building screeps into a box, ignores that some structures are walkable.

[1.5] Only use even x/y values for ROADS:
Screeps go vrooooom.

[2]Position ((array.length / 2) + 1) on x/y min/max becomes TOWER_SPOT: 
Allocate a fixed position on all sides for a tower defence.

[3]Use all min/max x/y values for walls. Except position (array.length / 2) on x/y min/max && TOWER_SPOT: 
Leaves a gap on all sides to enter and leave - a bottle neck.
 */

let lastScanned = undefined;

const constructionController = (baseConstants) => {
    // Periodically detect available building space
    const TEN_SECONDS = 10000;
    if(!lastScanned || lastScanned < (Date.now() - TEN_SECONDS)){
        spawnAreaConstructionAnalyser(baseConstants, 10);
        lastScanned = Date.now();
    }};

module.exports.loop = function () {
    const baseConstants = generateBaseConstants();

    economyController(baseConstants);
    logisticsController(baseConstants);
    populationController(baseConstants);
    constructionController(baseConstants);
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
