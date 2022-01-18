let harvest = require('./HarvesterActions');
let upgrade = require('./UpgraderActions');

function economyController(baseConstants) {
    harvest(baseConstants);
    upgrade(baseConstants);
}

module.exports = economyController;