
let tick = 0;
const defendRoom = (baseConstants) => {
    const { MAIN_SPAWN, SPAWNER_ROOMS, RADIUS } = baseConstants;
    let defenders = _.filter(Game.creeps,
        (creep) => creep.memory.role == 'defender');

    if (tick > 10) {
        tick = 0;
    }
    else {
        tick++;
    }
    _.forEach(defenders, (creep) => {
        if (!creep.memory.patrol) {
            creep.memory.patrol = 'left';
        }

        let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            creep.say('⚔️Engaging', true);
            if (creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestHostile, { visualizePathStyle: { stroke: '#f70000bf' } });
            }
        }
        else {
            patrol(creep, MAIN_SPAWN, RADIUS);
            if (tick % 5 === 0) {
                creep.say('⚔️Clear', true);
            }
        }
    });
}

function patrol(creep, MAIN_SPAWN, RADIUS) {
    // const room = creep.room.name;

    // const leftPatrol = new RoomPosition(MAIN_SPAWN.pos.x - (RADIUS - 1), MAIN_SPAWN.pos.y, room);
    // const rightPatrol = new RoomPosition(MAIN_SPAWN.pos.x + (RADIUS + 1), MAIN_SPAWN.pos.y, room);

    // if (creep.memory.patrol == 'left') {
    //     creep.moveTo(leftPatrol, { visualizePathStyle: { stroke: '#f70000bf' } });
    //     if (creep.pos.x === leftPatrol.x) {
    //         creep.say('⚔️Move-R', true);
    //         creep.memory.patrol = 'right';
    //     }
    // }
    // else {
    //     creep.moveTo(rightPatrol, { visualizePathStyle: { stroke: '#f70000bf' } });
    //     if (creep.pos.x === rightPatrol.x) {
    //         creep.say('⚔️Move-L', true);
    //         creep.memory.patrol = 'left';
    //     }
    // }
};

export default defendRoom;