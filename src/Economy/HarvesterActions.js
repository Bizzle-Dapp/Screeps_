
function harvest(baseConstants) {
    const { mainSpawn, potentialResource } = baseConstants;

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
        if (creep.memory.harvesting && creep.harvest(potentialResource[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(
                potentialResource[creep.memory.resourceDivide],
                { visualizePathStyle: { stroke: '#ffaa00' } });

        }
        if (!creep.memory.harvesting) {
            let deposit = mainSpawn.room.find(FIND_MY_STRUCTURES, {
                filter: (i) => ((i.structureType == STRUCTURE_CONTAINER) &&
                    i.store.getFreeCapacity() > 0)
            });
            
            if (creep.transfer(mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(mainSpawn,
                    { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    });
}

export default harvest;