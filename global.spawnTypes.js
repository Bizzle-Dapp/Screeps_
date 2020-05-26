
let spawnTypes = {

  ///
  // TIER 1
  ///
      /** @param {SpawnName} spawnName **/
      tier1Harvester: function(spawn){
      let newName = 'Ha-A' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
              {memory: {role: 'harvester'}});
      },

      /** @param {SpawnName} spawnName **/
      tier1Builder: function(spawn){
      let newName = 'Bu-A' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
      },

      /** @param {SpawnName} spawnName **/
      tier1Upgrader: function(spawn){
      let newName = 'Up-A' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,CARRY,CARRY,MOVE], newName,
          {memory: {role: 'upgrader'}});
      },

      /** @param {SpawnName} spawnName **/
      tier1Defender: function(spawn){
      let newName = 'De-A' + Game.time;
      Game.spawns[spawn].spawnCreep([RANGED_ATTACK,MOVE], newName,
          {memory: {role: 'defender'}});
      },

  ///
  // TIER 2
  ///
      /** @param {SpawnName} spawnName **/
      tier2Harvester: function(spawn){
      let newName = 'Ha-B' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
          {memory: {role: 'harvester'}});
      },

      /** @param {SpawnName} spawnName **/
      tier2Builder: function(spawn){
      let newName = 'Bu-B' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
      },

      /** @param {SpawnName} spawnName **/
      tier2Upgrader: function(spawn){
      let newName = 'Up-B' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
          {memory: {role: 'upgrader'}});
      },

      /** @param {SpawnName} spawnName **/
      tier2Repairer: function(spawn){
      let newName = 'Re-B' + Game.time;
      Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
          {memory: {role: 'repairer'}});
      },

      /** @param {SpawnName} spawnName **/
      tier2Defender: function(spawn){
      let newName = 'De-B' + Game.time;
      Game.spawns[spawn].spawnCreep([RANGED_ATTACK,RANGED_ATTACK,MOVE,TOUGH,TOUGH], newName,
          {memory: {role: 'defender'}});
      },

}

module.exports = spawnTypes;
