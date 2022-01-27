import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';
import builderConstruction from './BuilderConstruction';

function populationController(baseConstants) {
    // Priority of lowest to highest.
    builderConstruction(baseConstants);
    upgraderConstruction(baseConstants);
    harvesterConstruction(baseConstants);
}

export default populationController;