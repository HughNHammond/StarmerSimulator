let debug = false;

let startFont;

function preload() {
    textures[0] = loadImage("art/tiles/grassy.png")
    textures[1] = loadImage("art/tiles/stone.png")

    player.sprite = loadImage('art/characters/testPlayer.png')
    testNPCSprite = loadImage('art/characters/testNPC.png') 

    startFont = loadFont("font/PressStart2P.ttf")
    startImage = loadImage("art/portraits/startImage.png")
}

function setup() {
    //Player Object created as object so not here
    //fullscreen(true);

    textFont(startFont)
    transitionState = waitTransition
    switchState(transition)

    createCanvas(tilesX*tileSize, tilesY*tileSize)

    createTileMap(); //Creates the TileMap (in tilemap.js)


    //CREATE NPCs
    createNPCs();


    //CREATE DIALOGUEs
    createDialogueNodes();
    
}

function draw() {

    background(255)
    handlePlayState()

    if (gameState === walk || gameState === dialogue || gameState === respond) {
        mapEnabledDraw();
    }

    if (gameState === dialogue || gameState === respond) {
        dialogueDraw();
    }

}

function mapEnabledDraw() {
    //DISPLAY FUNCS

    //The => is called an arrow function. What it's doing here is creating a temporary variable called 'tile' (notice it's not
    //plural!), and saying "go inside the object in that variable and find a function calld display()". So when loopTilesAndRunFunc()
    //gets to func(tilemap[x][y]), it knows that it should look inside the tile stored in tilemap at the x and y index and find and run
    //a function called display(). It will do this for every single tile before doing it again for debug() if enabled.
    loopTilesAndRunFunc(tile => tile.display());
    player.draw()
    drawNPCs();


    //DEBUG CODE
    if (debug) {
        loopTilesAndRunFunc(tile => tile.debug()) //Adds grid to tileMap
        console.log("current state is: " + gameState)
    }
}

