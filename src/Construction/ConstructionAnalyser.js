import _ from "lodash";

const constructionAnalyser = (baseConstants) => {
    const { mainSpawn } = baseConstants;

    const room = Game.rooms[mainSpawn.room.name];
    // Scan area
    const scannedArea = room.lookAtArea(
        mainSpawn.pos.y - 10,
        mainSpawn.pos.x - 10,
        mainSpawn.pos.y + 10,
        mainSpawn.pos.x + 10,
        true
    );
    // Create an ignore list of all positions occupied by something other than terrain
    const ignoreList = [];
    _.forEach(scannedArea.filter(x => x.type !== 'terrain'), x => {
        ignoreList.push({ x: x.x, y: x.y });
    });
    // Filter the scannedArea of any positions contained in the ignoreList
    const filteredArea = []
    _.forEach(scannedArea.filter(x => x.type === 'terrain' && x.terrain === 'plain'), x => {
        if (!ignoreList.find(y =>  y.x == x.x && y.y == x.y)) {
            filteredArea.push(x);
        };
    })
    // Display our available locations
    filteredArea.forEach((areaDetails) => {
        room.visual.circle(areaDetails.x, areaDetails.y,
            {
                fill: 'transparent',
                radius: 0.1,
                stroke: 'green'
            });
    });
}

export default constructionAnalyser;
