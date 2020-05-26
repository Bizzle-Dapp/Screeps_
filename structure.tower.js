let tick = 0;

let structureTower = {
    run: function(tower){

        if(tick > 10)
        {
            Game.spawns['Spawn1'].room.visual.text(
            '🎇 Scanning...',
            tower.pos.x + 1,
            tower.pos.y,
            {align: 'left', opacity: 0.8});
            tick = 0;
        }
        else
        {
            tick++;
        }

        if(tower) {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    }
}


module.exports = structureTower;
