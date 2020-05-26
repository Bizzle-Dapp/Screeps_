let creepShared = require('role._creepShared');

let roleHarvester = {

    /** @param {Creep} creep **/
    /** @param {Priority} priority **/
    /** @param {Room} room **/
    run: function(creep, priority, room) {
	    if(creep.store.getFreeCapacity() > 0) {
          creepShared.harvest(creep,priority,room)
        }
        else {
          creepShared.depositSource(creep,priority,room);
        }
	}
};

module.exports = roleHarvester;
