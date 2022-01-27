

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

const BaseFabrication = (baseConstants, buildingPositions) => {


}