
function defenderConstruction(baseConstants) {
    // Spawn a Defender
    let defenders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'defender');
    if (defenders.length < 2) {
        let id = Date.now();
        baseConstants.MAIN_SPAWN.spawnCreep([ATTACK, ATTACK, MOVE, MOVE], `Defender-${id.toString()}`, {
            memory: { role: 'defender' }
        });
    }
}

export default defenderConstruction;