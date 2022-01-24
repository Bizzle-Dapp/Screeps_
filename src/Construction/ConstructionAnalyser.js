import _ from "lodash";

/**
 * Determines and returns buildable positions around the spawner
 * @param {{"MAIN_SPAWN": Spawner}} baseConstants - An object of constant defined values specific to the base
 * @param {number} radius - A numeric value to check around the spawn in each direction
 * @returns {[{"x": number, "y": number}]} An array of buildable x,y coordinate objects
 */
const spawnAreaConstructionAnalyser = (baseConstants, radius) => {
    const { MAIN_SPAWN } = baseConstants;

    const room = Game.rooms[MAIN_SPAWN.room.name];
    // Scan area
    const scannedArea = room.lookAtArea(
        MAIN_SPAWN.pos.y - radius,
        MAIN_SPAWN.pos.x - radius,
        MAIN_SPAWN.pos.y + radius,
        MAIN_SPAWN.pos.x + radius,
        true
    );
    // Create an ignore list of all positions occupied by something other than terrain
    const ignoreList = [];
    _.forEach(scannedArea.filter(x => x.type !== 'terrain'), x => {
        ignoreList.push({ x: x.x, y: x.y });
    });
    // Filter the scannedArea of any positions contained in the ignoreList
    const filteredArea = []
    _.forEach(scannedArea.filter(x => x.type === 'terrain' && x.terrain === 'plain'), x => {
        if (!ignoreList.find(y =>  y.x == x.x && y.y == x.y)) {
            filteredArea.push(x);
        };
    })
    // Display our available locations
    filteredArea.forEach((areaDetails) => {
        room.visual.circle(areaDetails.x, areaDetails.y,
            {
                fill: 'transparent',
                radius: 0.1,
                stroke: 'green'
            });
    });

    return filteredArea
}

export default spawnAreaConstructionAnalyser;
