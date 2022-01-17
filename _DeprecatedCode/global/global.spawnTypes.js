
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
      Game.spawns[spawn].spawnCreep([ATTACK,MOVE], newName,
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
      Game.spawns[spawn].spawnCreep([ATTACK,ATTACK,ATTACK,MOVE,TOUGH,TOUGH,TOUGH,TOUGH], newName,
          {memory: {role: 'defender'}});
      },

  ///
  // TIER 3
  ///
      /** @param {SpawnName} spawnName **/
      tier3Harvester: function(spawn){
      let newName = 'Ha-C' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
          {memory: {role: 'harvester'}});
      },

      /** @param {SpawnName} spawnName **/
      tier3Builder: function(spawn){
      let newName = 'Bu-C' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
      },

      /** @param {SpawnName} spawnName **/
      tier3Upgrader: function(spawn){
      let newName = 'Up-C' + Game.time;
      Game.spawns[spawn].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
          {memory: {role: 'upgrader'}});
      },

      /** @param {SpawnName} spawnName **/
      tier3Repairer: function(spawn){
      let newName = 'Re-C' + Game.time;
      Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
          {memory: {role: 'repairer'}});
      },

      /** @param {SpawnName} spawnName **/
      tier3Defender: function(spawn){
      let newName = 'De-C' + Game.time;
      Game.spawns[spawn].spawnCreep([ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH], newName,
          {memory: {role: 'defender'}});
      },



}

module.exports = spawnTypes;
