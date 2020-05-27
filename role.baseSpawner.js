var spawnTypes = require('global.spawnTypes');

let spawning = 0;

let baseSpawner = {
    run: function(spawn, H, B, U, D, R, C){
        spawnChecker(spawn, H, B, U, D, R, C);
    }
}

function spawnChecker(spawn, H, B, U, D, R, C){

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    spawning = 0;

    if(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES).filter(s => s.structureType == 'extension').length < 5 ||
    Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS).length < 5 ||
    harvesters.length < 2)
    {
        // Perform basic Spawning Routine
        basicSpawnRoutine(spawn, H, B, U, D);
    }
    if(Game.spawns['Spawn1'].room.find(FIND_STRUCTURES).filter(s => s.structureType == 'extension').length >= 5)
    {
        // Perform  tier 2 Spawning Routine
        tier2SpawnRoutine(spawn, H, B, U, D, R, C);
    }
}

function basicSpawnRoutine(spawn, H, B, U, D){
    // Check on our Harvesters...
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
    if(harvesters.length < H) {
        spawning = 1;
        spawnTypes.tier1Harvester(spawn);
    }

    // Check on our Builders...
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    //console.log('Builders: ' + builders.length);
    if(builders.length < B && spawning < 1) {
        spawning = 1;
        spawnTypes.tier1Builder(spawn);
    }

    // Check on our Upgraders
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    //console.log('Upgraders: ' + builders.length);
    if(upgraders.length < U && spawning < 1) {
        spawning = 1;
        spawnTypes.tier1Upgrader(spawn);
    }

    // Check on our Defenders
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    //console.log('Upgraders: ' + builders.length);

    if(defenders.length < D && spawning < 1) {
        spawning = 1;
        spawnTypes.tier1Defender(spawn);
    }
}

function tier2SpawnRoutine(spawn, H, B, U, D, R){
    // Check on our Defenders
    let defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');

    if(defenders.length < D && spawning < 1) {
        spawning = 1;
        spawnTypes.tier2Defender(spawn);
    }

    // Check on our Harvesters...
    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

    if(harvesters.length < H && spawning < 1) {
        spawning = 1;
        spawnTypes.tier2Harvester(spawn);
    }

    // Check on our Builders...
    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(builders.length < B && spawning < 1) {
        spawning = 1;
        spawnTypes.tier2Builder(spawn);
    }

    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    if(repairers.length < R && spawning < 1) {
        spawning = 1;
        spawnTypes.tier2Repairer(spawn);
    }

    // Check on our Upgraders
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

    if(upgraders.length < U && spawning < 1) {
        spawning = 1;
        spawnTypes.tier2Upgrader(spawn);
    }
}

function tier3SpawnRoutine(H,B,U,D,R,C){

}



module.exports = baseSpawner;
