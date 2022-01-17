
let creepShared = {

  //
  // GET TARGET SOURCE
  //
  /** @param {Priority} priority **/
  /** @param {Room} room **/
  getTargetSource: function getTargetSource(priority, room){
    let selectedIndex = (Game.rooms[room].find(FIND_SOURCES_ACTIVE).length - 1) - priority;
    if(selectedIndex < 0)
    {
      selectedIndex = 0;
    }
    if(selectedIndex > (Game.rooms[room].find(FIND_SOURCES_ACTIVE).length - 1))
    {
      selectedIndex = Game.rooms[room].find(FIND_SOURCES_ACTIVE).length - 1;
    }
    //console.log(selectedIndex);
    return Game.rooms[room].find(FIND_SOURCES_ACTIVE).sort((a,b) => {return a.id < b.id})[selectedIndex];
  },

  //
  // HARVEST SOURCE
  //
  /** @param {Creep} creep **/
  /** @param {Priority} priority **/
  /** @param {Room} room **/
  harvest: function harvest(creep, priority, room){
    let sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(creepShared.getTargetSource(priority, room)) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creepShared.getTargetSource(priority, room), {visualizePathStyle: {stroke: '#ffaa00'}});
      }
  },
  //
  // DEPOSIT SOURCE
  //
  /** @param {Creep} creep **/
  /** @param {Priority} priority **/
  /** @param {Room} room **/
  depositSource: function depositSource(creep, priority, room){
    let targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
    });
    //console.log("Extensions with available space: " + targets.length);
    if(targets == 0)
    {
      targets = creep.room.find(FIND_STRUCTURES, {
              filter: (structure) => {
                  return (structure.structureType == STRUCTURE_SPAWN) &&
                      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
              }
            });
        //console.log("Spawns with available space: " + targets.length);
    }
    if(targets == 0)
    {
      targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                  return (structure.structureType == STRUCTURE_CONTAINER ||
                          structure.structureType == STRUCTURE_TOWER) &&
                   (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
            }
          });
      //console.log("Containers with available space: " + targets.length);
    }

    if(targets.length > 0) {
      var target = targets[0];
      //console.log(target);
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else{
      creep.say('🗳️Full', true);
    }
  }
}

module.exports = creepShared;
