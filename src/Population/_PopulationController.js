import constructionAnalyser from '../Construction/ConstructionAnalyser';
import harvesterConstruction from './HarvesterConstruction';
import upgraderConstruction from './UpgraderConstruction';

let lastScanned = undefined;

function populationController(baseConstants) {
    // Detect available building space
    
    if(!lastScanned || lastScanned < (Date.now() - 10000)){
        constructionAnalyser(baseConstants);
        lastScanned = Date.now();
    };

    harvesterConstruction(baseConstants);
    upgraderConstruction(baseConstants);
}

export default populationController;