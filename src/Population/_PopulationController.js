import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';
import builderConstruction from './BuilderConstruction';
import defenderConstruction from './DefenderConstruction';

function populationController(baseConstants) {
    // Priority of lowest to highest.
    defenderConstruction(baseConstants);
    builderConstruction(baseConstants);
    upgraderConstruction(baseConstants);
    harvesterConstruction(baseConstants);
}

export default populationController;