import _ from "lodash";

/**
 * -- Rules for a successful base; Part 1.1 -- 
[1] Only use odd x/y values for STRUCTURES: 
Circumvents the chance of building screeps into a box, ignores that some structures are walkable.

[1.5] Only use even x/y values for ROADS:
Screeps go vrooooom.

[2]Position ((array.length / 2) + 1) on x/y min/max becomes TOWER_SPOT: 
Allocate a fixed position on all sides for a tower defence.

[3]Use all min/max x/y values for walls. Except position (array.length / 2) on x/y min/max && TOWER_SPOT: 
Leaves a gap on all sides to enter and leave - a bottle neck.
 */

const baseFabrication = (baseConstants, buildingPositions, RADIUS) => {
    const { SPAWNER_ROOMS, MAIN_SPAWN } = baseConstants;

    const room = Game.rooms[SPAWNER_ROOMS[0]];
    let constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES).length;
    _.forEach(buildingPositions, (position) => {
        // Cap at 10 construction sites so as to not overwhelm workers.
        if(constructionSites.length >= 10) { 
            return; 
        };
        fabricationManagement(position, room, MAIN_SPAWN, RADIUS);
        constructionSites++;
    });
}

const fabricationManagement = (position, room, MAIN_SPAWN, RADIUS) => {
    const { x, y} = position;

    // If x +/- and y +/- align with RADIUS distance in all directions. Build a Road.
    if( x === (MAIN_SPAWN.pos.x + RADIUS) && y === MAIN_SPAWN.pos.y || 
        x === (MAIN_SPAWN.pos.x - RADIUS) && y === MAIN_SPAWN.pos.y ||
        x === MAIN_SPAWN.pos.x && y === (MAIN_SPAWN.pos.y - RADIUS) ||
        x === MAIN_SPAWN.pos.x && y === (MAIN_SPAWN.pos.y + RADIUS) ) {
            // Road
            room.createConstructionSite(x, y, STRUCTURE_ROAD);
            return;
        }


    // If x or y are equal to Spawn positions vertexes +/- RADIUS; Build a wall.
    // Except where both are +/- RADUIS, build a Road here.
    if( x === (MAIN_SPAWN.pos.x + RADIUS) || x === (MAIN_SPAWN.pos.x - RADIUS) ||
        y === (MAIN_SPAWN.pos.y + RADIUS) || y === (MAIN_SPAWN.pos.y - RADIUS) ) {
            // Wall
            room.createConstructionSite(x, y, STRUCTURE_WALL);
            return;
        }

    // Logical nightmare.
    // switch (x % 2){
    //     case 1:
    //         switch (y % 2){
    //             case 1:
    //                 // X Odd Y Odd
    //                 break;
    //             default:
    //                 // X Odd  Y Even
    //                 break;
    //         }
    //         break;
    //     default:
    //         switch (y % 2){
    //             case 1:
    //                 // X Even Y Odd
    //                 break;
    //             default:
    //                 // X Even Y Even
    //                 break;
    //         }
    //         break;
    // }
}


export default baseFabrication;