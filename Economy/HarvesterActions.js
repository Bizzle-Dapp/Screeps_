
function harvest(baseConstants) {
    // Move Harvester to location, harvest, then return to spawn and diposit
    harvesters.forEach((creep) => {
        if (creep.store.getFreeCapacity() > 0) {
            if (creep.harvest(baseConstants.potentialResource[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    baseConstants.potentialResource[creep.memory.resourceDivide], 
                    { visualizePathStyle: { stroke: '#ffaa00' } 
                });
            } else {
                creep.harvest(baseConstants.potentialResource[creep.memory.resourceDivide])
            }
        } else {
            if(creep.transfer(baseConstants.mainSpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(baseConstants.mainSpawn, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    });
}

module.exports = harvest;