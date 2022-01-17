let spawnerRooms = require('./Constants');

module.exports.loop = function () {
    let mainSpawn = Game.rooms[spawnerRooms[0]].find(FIND_MY_STRUCTURES).filter((s) => s.structureType == 'spawn')[0];
    let potentialResource = Game.rooms[spawnerRooms[0]].find(FIND_SOURCES_ACTIVE);

    // Spawn a Harvester
    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 4) {
        let id = new Date;
        mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Worker-${id.toString()}`, {
            memory: { role: 'harvester', resourceDivide: (harvesters.length % 2)  }
        });
    }

    // Move Harvester to location, harvest, then return to spawn and diposit
    harvesters.forEach((creep) => {
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(potentialResource[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(potentialResource[creep.memory.resourceDivide], { visualizePathStyle: { stroke: '#ffaa00' } });
            } else {
                creep.harvest(potentialResource[creep.memory.resourceDivide])
            }
        } else {
            if(creep.transfer(mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mainSpawn, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    })

    clearance();
}

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('👻' + Memory.creeps[name].role + " creep has died.");
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}