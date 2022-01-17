let creepShared = require('role._creepShared');
let tick = 0;

let roleManualAttackProtocol = {
    /** @param {Creep} creep **/
    /** @param {Priority} priority **/
    /** @param {Room} room **/
    /** @param {TargetRoomPosition} targetroomPosition **/
    /** @param {Target} target **/
    run: function(creep, priority, room, targetRoomPosition, target) {
      if(tick > 10)
      {
          tick = 0;
      }
      else
      {
        if(tick === 0 || tick === 1 || tick === 2){
          if(tick === 0)
          {
            creep.memory.quote = getRandomWarQuote();
          }
          creep.room.visual.text(
          creep.memory.quote,
          creep.pos.x + 1,
          creep.pos.y,
          {align: 'left', opacity: 0.8});
        }
        tick++;
      }
      if(target)
      {
        creep.say('⚔️Engaging', true);
          if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
              creep.moveTo(target, {visualizePathStyle: {stroke: '#f70000bf'}});
          }
      }
      else{
        if(targetRoomPosition)
        {
          creep.moveTo(targetRoomPosition, {visualizePathStyle: {stroke: '#f70000bf'}});
        }
        else
        {
          patrol(creep, room);
          if(tick === 0 || tick === 1 || tick === 2){
            creep.say('⚔️No-Bogy', true);
          }
        }

      }
	}
};

function getRandomWarQuote(){
  let quoteNumber = getRandomInt(1,5);
  switch(quoteNumber){
    case 1:
    return "🏹Nyarrrgghhhhh!";
    break;
    case 2:
    return "🏹Ahh, shit. Here we go again...";
    break;
    case 3:
    return "🏹To arms!";
    break;
    case 4:
    return "🏹Today is a good day to die!";
    break;
    default:
    return "🏹Smoke if ya got em'...";
    break;
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


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

module.exports = roleManualAttackProtocol;
