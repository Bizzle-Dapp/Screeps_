import { creepHarvest } from '../Economy/HarvesterActions';
import { creepUpgrade } from '../Logistics/UpgraderActions';

function build(baseConstants) {
    const { MAIN_SPAWN, POTENTIAL_RESOURCE } = baseConstants;

    const builders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'builder');

    _.forEach(builders, (creep) => {
        if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
            creep.memory.building = true;
            creep.say('🏗build', true);
        }
        if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
            creep.memory.building = false;
            creep.say('🔄harvest', true);
        }
        const unsortedSites = creep.room.find(FIND_CONSTRUCTION_SITES);

        if (unsortedSites.length > 0) {
            // Construction Sites Available to build
            const sortedSites = unsortedSites.sort((a, b) => {
                if (a.progress > b.progress)
                    return -1;
                if (a.progress < b.progress)
                    return 1;
                return 0;
            });

            if (creep.memory.building && creep.build(sortedSites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sortedSites[0], { visualizePathStyle: { stroke: '#ffffff' } });
            } else if (!creep.memory.building && creep.harvest(POTENTIAL_RESOURCE[creep.memory.resourceDivide]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(
                    POTENTIAL_RESOURCE[creep.memory.resourceDivide],
                    { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            // No construction Sites Available to build
            // If containers available to fill - do so
            // creepHarvest(creep, MAIN_SPAWN, POTENTIAL_RESOURCE);
            // Otherwise, upgrade the controller!
            creepUpgrade(creep, POTENTIAL_RESOURCE);
        }
    });
}

export default build;