
function builderConstruction(baseConstants) {
    // Spawn a Harvester
    let builders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'builder');
    if (builders.length < 4) {
        let id = Date.now();
        baseConstants.mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Builder-${id.toString()}`, {
            memory: { role: 'builder', resourceDivide: (builders.length % 2)  }
        });
    }
}

export default harvesterConstruction;