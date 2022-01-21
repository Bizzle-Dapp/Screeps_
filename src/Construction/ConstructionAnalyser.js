const constructionAnalyser = (baseConstants) => {
    const { mainSpawn } = baseConstants;
    
    const terrain = Game.rooms[mainSpawn.room.name].getTerrain();
    const buildableLocations = [];

    for(let y = 0; y < 50; y++) {
        for(let x = 0; x < 50; x++) {
            const tile = terrain.get(x, y);
            
            if(tile === 0) {
                Game.rooms[mainSpawn.room.name].visual.circle(x,y,
                    {fill: 'transparent', radius: 0.1, stroke: 'green'});
                buildableLocations.push({x: x, y: y});
            }
        }
    }
    console.log("Buildable Locations:");
    Memory.buildableLocations = buildableLocations;
}

export default constructionAnalyser;