
function upgrade(baseConstants) {
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

module.exports = upgrade;