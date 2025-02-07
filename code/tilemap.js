let tilemap = [];
let tilesX = 16;
let tilesY = 10;
let tileSize = 50;
let tileID = 0;

let textures = [];

let spriteMap = [
//   0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //0
    [0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //1
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //2
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //3
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //4
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //5
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //6
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //7
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //8
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //9
]

let tileRules = [
//   0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //0
    [0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //1
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //2
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //3
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //4
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //5
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //6
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //7
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //8
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //9
]

function createTileMap() {
    for (let x = 0; x < tilesX; x++) {
        tilemap[x] = [];
        for (let y = 0; y < tilesY; y++) {
            tilemap[x][y] = new Tile(textures[spriteMap[y][x]], x, y, tileSize, tileID, tileRules[y][x])
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
    constructor(texture, tileX, tileY, tileSize, tileID, tileRules) {
        this.texture = texture;
        this.tileX = tileX;
        this.tileY = tileY;
        this.tileSize = tileSize;
        this.tileID = tileID;
        this.tileRules = tileRules;

        this.xPos = this.tileX * this.tileSize;
        this.yPos = this.tileY * this.tileSize;
    }

    display() {
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }

    debug() {

        strokeWeight(1)

        stroke("black")

        fill("yellow")
        textSize(8)
        text("X: " + this.tileX + ", Y: " + this.tileY, this.xPos + 2, this.yPos + 8) // +2 and +8 adds text padding to render text in right box

        textSize(10)
        text("ID: " + this.tileID, this.xPos + 2, this.yPos + 18)

        noFill();
        stroke('black');
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
}