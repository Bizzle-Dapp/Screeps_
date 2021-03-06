//////////////////////////////////////////////////////////
var baseSpawner = require('role.baseSpawner');
var consoleNotifications = require('global.notifications');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleRepairer = require('role.repairer');
var roleManualAttackProtocol = require('role.manualAttackProtocol');
var structureTower = require('role.structureTower');

//////////////////////////////////////////////////////////
var harvesterCount = 4;
var builderCount = 4;
var upgraderCount = 6;
var defenderCount = 4;
var repairerCount = 2;
var controllerClaimer = 0; //..WORK IN PROGRESS
//////////////////////////////////////////////////////////
var room1 = 'W8N3'; // Ideally, we need to access this programatically...
var mainSpawn = Game.rooms[room1].find(FIND_MY_STRUCTURES).filter((s)=> s.structureType == 'spawn')[0];

//////////////////////////////////////////////////////////
var manualAttackProtocol = false;
var m_a_p_Target = Game.getObjectById('82c8a8b10dace98');
var targetRoomPosition = new RoomPosition(26,30,'W5N3');
//////////////////////////////////////////////////////////


module.exports.loop = function () {
// IN Testing
// console.log(JSON.stringify(getFlag('Bizzle_Dapp_Home').memory));
//////////////////

// Execute notifications
consoleNotifications.run();
// Execute Spawning Module
baseSpawner.run(mainSpawn.name, harvesterCount, builderCount, upgraderCount, defenderCount, repairerCount);
// Cleanup
clearance();
// Execute All Creep Roles
executeCreepRole();

Game.rooms[room1].find(FIND_MY_STRUCTURES).filter((s) => s.structureType === 'tower').forEach((tower) => structureTower.run(Game.getObjectById(tower.id)));
}

//
// Main Functions
//

function executeCreepRole(){
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, 1, room1);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep, 0, room1);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep, 1, room1);
        }
        if(creep.memory.role == 'defender') {
          if(!manualAttackProtocol)
          {
            roleDefender.run(creep, 0, room1);
          }
          else{
            roleManualAttackProtocol.run(creep, 0, room1,targetRoomPosition, m_a_p_Target);
          }
        }
        if(creep.memory.role == 'repairer') {
          roleRepairer.run(creep, 0, room1);
        }
    }
}

function clearance(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log('👻' + Memory.creeps[name].role + " creep has died.");
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}


//
// In Testing
//

function getFlag(name){
  if(Game.flags[name]){
    return Game.flags[name];
  }
}
