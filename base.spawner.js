
let spawning = 0;

let baseSpawner = {
    run: function(H, B, U, D, R){
        spawnChecker(H,B,U,D,R);
    }
}

function spawnChecker(H,B,U,D,R){
    spawning = 0;

    if(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES).filter(s => s.structureType == 'extension').length < 5)
    {
        // Perform basic Spawning Routine
        basicSpawnRoutine(H,B,U,D);
    }
    if(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES).filter(s => s.structureType == 'extension').length >= 5)
    {
        // Perform  tier 2 Spawning Routine
        tier2SpawnRoutine(H,B,U,D,R);
    }
}

function basicSpawnRoutine(H,B,U,D){
    // Check on our Harvesters...
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < H) {
        spawning = 1;
        let newName = 'H-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    // Check on our Builders...
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);


    if(builders.length < B && spawning < 1) {
        spawning = 1;
        let newName = 'B-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    // Check on our Upgraders
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + builders.length);

    if(upgraders.length < U && spawning < 1) {
        spawning = 1;
        let newName = 'U-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    // Check on our Defenders
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    //console.log('Upgraders: ' + builders.length);

    if(defenders.length < D && spawning < 1) {
        spawning = 1;
        let newName = 'D-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,MOVE], newName,
            {memory: {role: 'defender'}});
    }
}

function tier2SpawnRoutine(H,B,U,D,R){
    // Check on our Harvesters...
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < 1 && spawning < 1) {
        spawning = 1;
        let newName = 'BasicH-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    // Check on our Defenders
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');

    if(defenders.length < D && spawning < 1) {
        spawning = 1;
        let newName = 'D-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([RANGED_ATTACK,MOVE], newName,
            {memory: {role: 'defender'}});
    }

    if(harvesters.length < H && spawning < 1) {
        spawning = 1;
        let newName = 'H-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    // Check on our Builders...
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < B && spawning < 1) {
        spawning = 1;
        let newName = 'B-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if(repairers.length < R && spawning < 1) {
        spawning = 1;
        let newName = 'R-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'repairer'}});
    }

    // Check on our Upgraders
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < U && spawning < 1) {
        spawning = 1;
        let newName = 'U-' + Game.time;
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }


}



module.exports = baseSpawner;
