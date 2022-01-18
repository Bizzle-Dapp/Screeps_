import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';

function CreepConstructionController(baseConstants) {
    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

export default CreepConstructionController;