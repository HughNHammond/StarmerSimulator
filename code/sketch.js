let debug = false;

let startFont;

let podium;
let podiumSprite;

//IMAGES

function preload() {
    textures[0] = loadImage("art/tiles/grassy.png")
    textures[1] = loadImage("art/tiles/stone.png")

    player.sprites = {
        up: loadImage('art/characters/starmer/starmer_up.png'),
        down: loadImage('art/characters/starmer/starmer_down.png'),
        left: loadImage('art/characters/starmer/starmer_left.png'),
        right: loadImage('art/characters/starmer/starmer_right.png'),
    }

    streetingSprite = loadImage("art/characters/streeting/streeting_down.png");

    startFont = loadFont("font/PressStart2P.ttf")
    startImage = loadImage("art/portraits/startImage.png")

    dialogueFont = loadFont("font/Pixellari.ttf")

    podiumSprite = loadImage("art/objects/podium.png")

    backgroundTest = loadImage("art/screens/downing_street_test.png")
}

function setup() {

    noSmooth();
    //Player Object created as object so not here
    //fullscreen(true);

    player.sprite = player.sprites[1]
    transitionState = waitTransition
    switchState(transition)

    createCanvas(tilesX*tileSize, tilesY*tileSize)

    createTileMap(); //Creates the TileMap (in tilemap.js)


    //CREATE NPCs
    createNPCs();


    //CREATE DIALOGUEs
    createDialogueNodes();

    podium = new InteractiveObjects(podiumSprite, 5, 5, podiumEvents)

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
    noSmooth();
    //loopTilesAndRunFunc(tile => tile.display());
    image(backgroundTest, 0, 0, width, height)
    player.draw()
    drawNPCs();
    podium.display();


    //DEBUG CODE
    if (debug) {
        loopTilesAndRunFunc(tile => tile.debug()) //Adds grid to tileMap
        console.log("current state is: " + gameState)
    }
}

