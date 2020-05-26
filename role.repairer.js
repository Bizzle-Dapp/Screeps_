let creepShared = require('role._creepShared');
let tick = 0;

let roleRepairer = {
    /** @param {Creep} creep **/
    /** @param {Priority} priority **/
    /** @param {Room} room **/
    run: function(creep, priority, room) {
      if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄harvest', true);
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧repair', true);
	    }

      if(creep.memory.repairing)
      {
        let targets = creep.room.find(FIND_STRUCTURES).filter((structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_CONTAINER ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_TOWER ||
                  structure.structureType == STRUCTURE_ROAD) &&
                  structure.hits < (structure.hitsMax * 0.99);
        })
        if(targets.length == 0)
        {
          targets = creep.room.find(FIND_STRUCTURES).filter((structure) => {
            return (structure.structureType == STRUCTURE_WALL) &&
                    structure.hits < 1000;
          });
        }
        if(targets.length > 0)
        {
          let target = targets.sort((a,b) => {return a.id < b.id})[0];
          if(creep.repair(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
          }
        }
        else
        {
          creep.say('🚧waitin', true);
        }
      }
      else {
        let collectionDepots = creep.room.find(FIND_STRUCTURES).filter((structure) => {
          return (structure.structureType == STRUCTURE_CONTAINER ||
                  structure.structureType == STRUCTURE_EXTENSION) &&
                  structure.store.getFreeCapacity(RESOURCE_ENERGY) == 0;
        })
        if(collectionDepots.length > 0)
        {
          //console.log(creep.name + ' withdrawing from ' + collectionDepots.sort((a,b) => {return a.id < b.id})[0])
          let collectionPoint = collectionDepots.sort((a,b) => {return a.id < b.id})[0];
          if(creep.withdraw(collectionPoint, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(collectionPoint, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
        else{
          creepShared.harvest(creep,priority,room);
	         }
        }


    }
};

module.exports = roleRepairer;
