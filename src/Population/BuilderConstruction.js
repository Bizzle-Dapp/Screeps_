
function builderConstruction(baseConstants) {
    // Spawn a Builder
    let builders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'builder');
    if (builders.length < 3) {
        let id = Date.now();
        baseConstants.MAIN_SPAWN.spawnCreep([WORK, WORK, CARRY, MOVE], `Builder-${id.toString()}`, {
            memory: { role: 'builder', resourceDivide: (builders.length % 2)  }
        });
    }
}

export default builderConstruction;