import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';

function CreepConstructionController(baseConstants) {
    // Detect available building space

    // Allocate space depending on current projects

    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

export default CreepConstructionController;