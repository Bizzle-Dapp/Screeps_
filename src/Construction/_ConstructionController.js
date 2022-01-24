import spawnAreaConstructionAnalyser from './ConstructionAnalyser';

let lastScanned = undefined;

const constructionController = (baseConstants) => {
    // Periodically detect available building space
    const TEN_SECONDS = 10000;
    if(!lastScanned || lastScanned < (Date.now() - TEN_SECONDS)){
        spawnAreaConstructionAnalyser(baseConstants, 10);
        lastScanned = Date.now();
    };
}

export default constructionController;