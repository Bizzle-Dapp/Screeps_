
function upgraderConstruction(baseConstants) {
    const { mainSpawn } = baseConstants;
    // Spawn an Upgrader
    let upgraders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let id = Date.now();
        mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Upgrader-${id.toString()}`, {
            memory: { role: 'upgrader', resourceDivide: (upgraders.length % 2)  }
        });
    }
}

export default upgraderConstruction;