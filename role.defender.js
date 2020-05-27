let creepShared = require('role._creepShared');
let tick = 0;

let roleDefender = {
    /** @param {Creep} creep **/
    /** @param {Priority} priority **/
    /** @param {Room} room **/
    run: function(creep, priority, room) {
      // Patrol Setup
      if(!creep.memory.patrol)
      {
        console.log('Setting Default Patrol Memory for: ' + creep.name)
        creep.memory.patrol = 'left';
      }

      if(tick > 10)
      {
          Game.spawns['Spawn1'].room.visual.text(
          '🎇 Scanning...',
          creep.pos.x + 1,
          creep.pos.y,
          {align: 'left', opacity: 0.8});
          tick = 0;
      }
      else
      {
          tick++;
      }
      let closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if(closestHostile) {
        creep.say('⚔️Engaging', true);
          if(creep.attack(closestHostile) == ERR_NOT_IN_RANGE) {
              creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#f70000bf'}});
          }
      }
      else{
        patrol(creep, room);
        if(tick === 0 || tick === 1 || tick === 2){
          creep.say('⚔️Clear', true);
        }
      }
	}

};

function patrol(creep, room){
  let leftPatrol = new RoomPosition(Game.spawns['Spawn1'].pos.x - 7, Game.spawns['Spawn1'].pos.y, room);
  let rightPatrol = new RoomPosition(Game.spawns['Spawn1'].pos.x + 7, Game.spawns['Spawn1'].pos.y, room);

  if(creep.memory.patrol == 'left')
  {
    let pos = new RoomPosition(leftPatrol.x, leftPatrol.y, room);
    creep.moveTo(leftPatrol, {visualizePathStyle: {stroke: '#f70000bf'}});
    if(creep.pos.x === leftPatrol.x)
    {
      creep.say('⚔️Move-R', true);
      creep.memory.patrol = 'right';
    }
  }
  else
  {
    creep.moveTo(rightPatrol, {visualizePathStyle: {stroke: '#f70000bf'}});
    if(creep.pos.x === rightPatrol.x)
    {
      creep.say('⚔️Move-L', true);
      creep.memory.patrol = 'left';
    }
  }
};

module.exports = roleDefender;
