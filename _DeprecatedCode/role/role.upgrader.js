let creepShared = require('role._creepShared');

let roleUpgrader = {

  /** @param {Creep} creep **/
  /** @param {Priority} priority **/
  /** @param {Room} room **/
    run: function(creep, priority, room) {

	    if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄harvest', true);
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0){
            creep.memory.upgrading = true;
            creep.say('💪upgrade', true);
        }

        if(creep.memory.upgrading)
        {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
          creepShared.harvest(creep,priority,room);
        }
	}
};

module.exports = roleUpgrader;
