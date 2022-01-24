const SPAWNER_ROOMS = Object.values(Game.spawns).map((v) => v.room.name);

/**
 * Returns key base information
 */
const generateBaseConstants = () => {
    // Once we have multiple spawns, pass key/value pairs including nearby resources related to each spawner
    const MAIN_SPAWN = Game.rooms[SPAWNER_ROOMS[0]]
        .find(FIND_MY_STRUCTURES)
        .filter((s) => s.structureType == STRUCTURE_SPAWN)[0];

    const POTENTIAL_RESOURCE = Game.rooms[SPAWNER_ROOMS[0]].find(FIND_SOURCES_ACTIVE);

    return {
        MAIN_SPAWN,
        SPAWNER_ROOMS,
        POTENTIAL_RESOURCE
    }
}

export default generateBaseConstants;
