
function harvesterConstruction(baseConstants) {
    const { mainSpawn } = baseConstants;
    // Spawn a Harvester
    let harvesters = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 4) {
        let id = Date.now();
        mainSpawn.spawnCreep([WORK, CARRY, MOVE], `Worker-${id.toString()}`, {
            memory: { role: 'harvester', resourceDivide: (harvesters.length % 2)  }
        });
    }
}

export default harvesterConstruction;