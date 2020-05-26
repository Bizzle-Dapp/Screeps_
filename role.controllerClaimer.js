let creepShared = require('role._creepShared');
let tick = 0;

let controllerClaimer = {
    /** @param {Creep} creep **/
    /** @param {Priority} priority **/
    /** @param {Room} room **/
    run: function(creep, priority, room) {
      // WORK IN PROGRESS
        if(creep.room.controller) {
          if(creep.claimController(room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(room.controller);
          }
      }
  };
}


module.exports = controllerClaimer;
