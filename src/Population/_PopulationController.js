import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';

function populationController(baseConstants) {
    

    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

export default populationController;