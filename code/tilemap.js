let tilemap = [];
let tilesX = 11;
let tilesY = 9;
let tileSize = 60;
let tileID = 0;


let interior = {
    tileRules: [
        //   0  1  2  3  4  5  6  7  8  9  10  
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //0
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //1
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //2
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //3
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //4
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //5
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //6
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1], //7
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1], //8
        ],
    backgroundImage: null,
    activeNPCs: () => [mcsweeney, streeting],
    startX: 5,
    startY: 8,
    nextLevel: 1
}

let exterior = {
    tileRules: [
        //   0   1   2   3   4   5   6   7   8   9   10  
            [1,  1,  1,  1,  1,  2,  1,  1,  1,  1,  1], //0
            [1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1], //1
            [1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1], //2
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //3
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //4
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //5
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //6
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //7
            [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //8
        ],
    
    backgroundImage: null,
    activeNPCs: () => [podium],
    startX: 5,
    startY: 1,
    nextLevel: 0
}

let currentLevel;
let levels = [interior, exterior]

function loadLevel(level) {
    //LOAD LEVEL DATA
    currentLevel = level;
    tileRules = level.tileRules;
    activeNPCs = level.activeNPCs();
    player.xPos = level.startX * tileSize;
    player.yPos = level.startY * tileSize;
    backgroundImage = level.backgroundImage;

    //CREATE NEW TILEMAP
    for (let x = 0; x < tilesX; x++) {
        tilemap[x] = [];
        for (let y = 0; y < tilesY; y++) {
            tilemap[x][y] = new Tile(x, y, tileSize, tileID, tileRules[y][x])
            tileID++;
        }
    }
}


function loopTilesAndRunFunc(func) {
    //SEE NOTES ON SKETCH UNDER DRAW()
    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            func(tilemap[x][y])
        }
    }
}

class Tile{
    constructor(tileX, tileY, tileSize, tileID, tileRules) {
        this.tileX = tileX;
        this.tileY = tileY;
        this.tileSize = tileSize;
        this.tileID = tileID;
        this.tileRules = tileRules;

        this.xPos = this.tileX * this.tileSize;
        this.yPos = this.tileY * this.tileSize;
    }

    display() {
        image(this.xPos, this.yPos, this.tileSize, this.tileSize)
    }

    debug() {

        textAlign(CENTER)

        strokeWeight(1)

        stroke("black")

        fill("yellow")
        textSize(8)
        text("X: " + this.tileX + ", Y: " + this.tileY, this.xPos + 20, this.yPos + 8) // +2 and +8 adds text padding to render text in right box

        textSize(10)
        text("ID: " + this.tileID, this.xPos + 20, this.yPos + 18)

        noFill();
        stroke('yellow');
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
}