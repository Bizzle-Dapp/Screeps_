let tick = 0;

let consoleNotifications = {
    run: function(){


        spawnNotification();
        creepsReportIn();
    }
}

function spawnNotification(){
    if(Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y -1,
            {align: 'left', opacity: 0.8});
    }
}

function creepsReportIn(){
    for(let creep in Game.creeps)
        {
            if(Game.creeps[creep].ticksToLive < 10)
            {
               Game.creeps[creep].say('⚠️It ends.', true);
            }
        }

    if(tick % 60 == 0)
    {
        Game.spawns['Spawn1'].room.visual.text(
            '🤖Extension Report: ' + Game.spawns['Spawn1'].room.find(FIND_STRUCTURES).filter(s => s.structureType == 'extension').length,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y - 1,
            {align: 'left', opacity: 0.8});

    }
    if(tick > 605) // Report in and reset every 10 minutes.
    {
        tick = 0;
        for(let creep in Game.creeps)
        {
           console.log(creep + ' reporting in...');
           Game.creeps[creep].say('🤖' + creep)
        }

    }
    else{
        tick++;
    }
}

module.exports = consoleNotifications;
