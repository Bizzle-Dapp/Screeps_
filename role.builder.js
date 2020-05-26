let creepShared = require('role._creepShared');

let roleBuilder = {

  /** @param {Creep} creep **/
  /** @param {Priority} priority **/
  /** @param {Room} room **/
    run: function(creep, priority, room) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄harvest', true);
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧build', true);
	    }

	    if(creep.memory.building) {
	        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
              let theTargets = targets.sort((a, b) => {
                                            if (a.progress > b.progress)
                                              return -1;
                                            if (a.progress < b.progress)
                                              return 1;
                                            return 0;
                                          });

                if(creep.build(theTargets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(theTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
              creepShared.depositSource(creep,priority,room);
            }
        }
	    else {
        let sites = creep.room.find(FIND_CONSTRUCTION_SITES);
          if(sites.length > 0) {
          let collectionDepots = creep.room.find(FIND_STRUCTURES).filter((structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) &&
                    (structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0);
          })
          if(collectionDepots.length > 0)
          {
            let collectionPoint = collectionDepots.sort((a,b) => {return a.id < b.id})[0];
            if(creep.withdraw(collectionPoint, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(collectionPoint, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
          }
          else{
            creepShared.harvest(creep, priority, room);
          }
         }
         else{
           creepShared.harvest(creep, priority, room);
         }
	    }
	}
};

/*
function harvest(creep, priority, room){
  let sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(creepShared.getTargetSource(priority, room)) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creepShared.getTargetSource(priority, room), {visualizePathStyle: {stroke: '#ffaa00'}});
    }
}
*/
module.exports = roleBuilder;
