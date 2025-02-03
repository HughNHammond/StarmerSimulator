let tilemap = [];
let tilesX = 20;
let tilesY = 10;
let tileSize = 50;
let tileID = 0;
let textures = [];

let spriteMap = [
//   0   1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19 
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //0
    [0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //1
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //2
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //3
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //4
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //5
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //6
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //7
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //8
    [0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0], //9
]

function preload() {
    textures[0] = loadImage("art/tiles/grassy.png")
    textures[1] = loadImage("art/tiles/stone.png")
}

function setup() {
    createCanvas(1000, 500)
    createTileMap();
}

function draw() {
    background(255)
    displayTileMap();
    
}

function createTileMap() {
    for (let x = 0; x < tilesX; x++) {
        tilemap[x] = [];
        for (let y = 0; y < tilesY; y++) {
            tilemap[x][y] = new Tile(textures[spriteMap[y][x]], x, y, tileSize, tileID)
            tileID++;
        }
    }
}

function displayTileMap() {
    for (let x = 0; x < tilesX; x++) {
        for (let y = 0; y < tilesY; y++) {
            tilemap[x][y].display();
            tilemap[x][y].debug();
        }
    }
}

class Tile{
    constructor(texture, tileX, tileY, tileSize, tileID) {
        this.texture = texture;
        this.tileX = tileX;
        this.tileY = tileY;
        this.tileSize = tileSize;
        this.tileID = tileID;

        this.xPos = this.tileX * this.tileSize;
        this.yPos = this.tileY * this.tileSize;
    }

    display() {
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }

    debug() {
        textSize(8)
        text("X: " + this.tileX + ", Y: " + this.tileY, this.xPos + 2, this.yPos + 8) // +2 and +8 adds text padding to render text in right box

        noFill();
        stroke('black');
        rect(this.xPos, this.yPos, this.tileSize, this.tileSize);
    }
}
