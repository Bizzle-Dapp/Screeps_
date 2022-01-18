export const spawnerRooms = ['W6N1'];

/**
 * Returns key base information
 */
export const generateBaseConstants = () => {
    // Once we have multiple spawns, pass key/value pairs including nearby resources related to each spawner
    let mainSpawn = Game.rooms[spawnerRooms[0]]
                    .find(FIND_MY_STRUCTURES)
                    .filter((s) => s.structureType == 'spawn')[0];
    let potentialResource = Game.rooms[spawnerRooms[0]].find(FIND_SOURCES_ACTIVE);
    
    return {
        mainSpawn,
        potentialResource
    }
}

