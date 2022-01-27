import spawnAreaConstructionAnalyser from './ConstructionAnalyser';
import baseFabrication from './BaseFabrication';
import build from './BuilderActions';
import _ from 'lodash';

let lastScanned = undefined;

const constructionController = (baseConstants) => {
    const { SPAWNER_ROOMS } = baseConstants;
    const TEN_SECONDS = 10000;
    const RADIUS = 10;

    let totalCreeps = 0;
    
    _.forEach(SPAWNER_ROOMS, (roomName) => {
        totalCreeps += Game.rooms[roomName].find(FIND_MY_CREEPS).length;
    })

    // Periodically detect available building space
    if(!lastScanned && totalCreeps > 3 || 
        lastScanned < (Date.now() - TEN_SECONDS) && totalCreeps > 3 ){
        const buildingPositions = spawnAreaConstructionAnalyser(baseConstants, RADIUS);
        baseFabrication(baseConstants, buildingPositions, RADIUS)
        lastScanned = Date.now();
    };
    build(baseConstants);
}

export default constructionController;