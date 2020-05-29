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
          let targets = tower.room.find(FIND_STRUCTURES).filter((structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_ROAD) &&
                    structure.hits < (structure.hitsMax * 0.99);
          })
          if(targets.length == 0)
          {
            targets = tower.room.find(FIND_STRUCTURES).filter((structure) => {
              return (structure.structureType == STRUCTURE_WALL) &&
                      structure.hits < 5000;
            });
          }
        if(targets.length > 0) {
            tower.repair(targets[0]);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    }
}


module.exports = structureTower;
