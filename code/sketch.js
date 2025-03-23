let debug = false;

let startFont;

let podium;
let podiumSprite;
let downArrow;
let upArrow;

let count = 0;
let lastCount = 0
let timerMax = 6;

//IMAGES
let backgroundImage;
let interiorImage;
let exteriorImage;

function preload() {

    player.sprites = {
        up: [loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk0.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk1.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk2.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk3.png')],
        down: [loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk0.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk1.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk2.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk3.png')],
        left: [loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk0.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk1.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk2.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk3.png')],
        right: [loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk0.png'), loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk1.png'),loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk2.png'),loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk3.png')],
    }

    downArrow = loadImage("art/objects/DownArrow.png");
    upArrow = loadImage("art/objects/UpArrow.png");

    streetingSprite = loadImage("art/characters/streeting/streeting_down.png");

    startFont = loadFont("font/PressStart2P.ttf")
    startImage = loadImage("art/portraits/startImage.png")

    dialogueFont = loadFont("font/Pixellari.ttf")
    podiumSprite = loadImage("art/objects/podium.png")

    interiorImage = loadImage("art/screens/Downing Street Interior.png");
    interior.backgroundImage = interiorImage;
    exteriorImage = loadImage("art/screens/Downing Street Exterior.png");
    exterior.backgroundImage = exteriorImage;
}

function setup() {

    noSmooth();
    //Player Object created as object so not here
    //fullscreen(true);

    player.spriteDirection = player.sprites.down;
    transitionState = waitTransition
    switchState(transition)

    createCanvas(tilesX*tileSize, tilesY*tileSize)


    //CREATE NPCs
    createNPCs(); // intialises NPC objects
    createDialogueEvents(); // creates Dialogue Nodes
    attachStartNodesToNPCs(); // attaches starting dialogue nodes to each NPC

    loadLevel(interior)
    player.xPos = playerStartX * tileSize;
    player.yPos = playerStartY * tileSize;

    podium.yPos += (tileSize/2);

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

    count++;

    // if (keyIsDown(85)) {// b
    //     drawDialogueBox();
    // }

}

function mapEnabledDraw() {
    //DISPLAY FUNCS

    //The => is called an arrow function. What it's doing here is creating a temporary variable called 'tile' (notice it's not
    //plural!), and saying "go inside the object in that variable and find a function calld display()". So when loopTilesAndRunFunc()
    //gets to func(tilemap[x][y]), it knows that it should look inside the tile stored in tilemap at the x and y index and find and run
    //a function called display(). It will do this for every single tile before doing it again for debug() if enabled.
    noSmooth();
    //loopTilesAndRunFunc(tile => tile.display());
    image(backgroundImage, 0, 0, width, height)

    displayCharacters();
   //podium.display();


    //DEBUG CODE
    if (debug) {
        loopTilesAndRunFunc(tile => tile.debug()) //Adds grid to tileMap
        console.log("current state is: " + gameState)
    }
}

function displayCharacters() {

    player.draw()

    for (x = 0; x < activeNPCs.length; x++) {
        if (activeNPCs[x].active)
            activeNPCs[x].display();
            activeNPCs[x].displayName();
    }

    if (currentLevel === exterior) {
        if (player.tileY >= 6) {
            player.display();
        }
    }
}

function timer(lastCount, timerEnd) {
    if (count - lastCount >= timerEnd) {
        return true;
    }
    else {
        return false;
    }
}

