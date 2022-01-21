const spawnerRooms = Object.values(Game.spawns).map((v) => v.room.name);

/**
 * Returns key base information
 */
const generateBaseConstants = () => {
    // Once we have multiple spawns, pass key/value pairs including nearby resources related to each spawner
    let mainSpawn = Game.rooms[spawnerRooms[0]]
        .find(FIND_MY_STRUCTURES)
        .filter((s) => s.structureType == STRUCTURE_SPAWN)[0];

    let potentialResource = Game.rooms[spawnerRooms[0]].find(FIND_SOURCES_ACTIVE);

    return {
        mainSpawn,
        spawnerRooms,
        potentialResource
    }
}

export default generateBaseConstants;
