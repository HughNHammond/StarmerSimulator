let debug = false; // Activates debug display

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

let phoneCall = false; //if false, call dialgoue will start when game starts.
let pressCompleted = false;

function preload() {

    //Player Sprites
    player.sprites = {
        up: [loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk0.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk1.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk2.png'), loadImage('art/characters/starmer/starmer_up_walk/starmer_up_walk3.png')],
        down: [loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk0.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk1.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk2.png'), loadImage('art/characters/starmer/starmer_down_walk/starmer_down_walk3.png')],
        left: [loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk0.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk1.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk2.png'), loadImage('art/characters/starmer/starmer_left_walk/starmer_left_walk3.png')],
        right: [loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk0.png'), loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk1.png'),loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk2.png'),loadImage('art/characters/starmer/starmer_right_walk/starmer_right_walk3.png')],
    }

    //NPC Sprites
    streetingSprite = loadImage("art/characters/streeting/streeting_down.png");
    podiumSprite = loadImage("art/objects/podium.png")

    //Tilemap images
    interiorImage = loadImage("art/screens/Downing Street Interior.png");
    interior.backgroundImage = interiorImage;
    exteriorImage = loadImage("art/screens/Downing Street Exterior.png");
    exterior.backgroundImage = exteriorImage;

    //Sprites for Dialogue System
    downArrow = loadImage("art/objects/DownArrow.png");
    upArrow = loadImage("art/objects/UpArrow.png");

    //Opening Title Image
    startImage = loadImage("art/portraits/startImage.png")

    //Loading Fonts
    startFont = loadFont("font/PressStart2P.ttf")
    dialogueFont = loadFont("font/Pixellari.ttf")
}

function setup() {

    noSmooth(); //This turns off smoothing on images, which I don't want on pixel art

    //Set Starting States
    player.spriteDirection = player.sprites.down; //Defaults player sprite to show down-facing sprite
    transitionState = waitTransition //Skips fade-in on start screen transition
    switchState(transition) //Sets game state to transition state
    setWinText(); //Randomly determines what final message will display on win screen

    //Creating the Canvas
    createCanvas(tilesX*tileSize, tilesY*tileSize)


    //CREATE NPCs
    createNPCs(); // intialises NPC objects
    createDialogueEvents(); // creates Dialogue Nodes
    attachStartNodesToNPCs(); // attaches starting dialogue nodes to each NPC

    //Set and load the first level!
    loadLevel(interior)

    //Set Player Start Position (I want the player to start in a different position when the level is first loaded!)
    player.xPos = playerStartX * tileSize;
    player.yPos = playerStartY * tileSize;

    //Modifies podium Y position so it does not appear in centre of pile (player therefore appears to stand behind it)
    podium.yPos += (tileSize/2);
}

function draw() {

    background(255) //Black background
    handlePlayState() //Checks what state the game is currently in and runs approprate functions (see state.js)

    //CHECK IF MAP SHOULD BE DRAWN IN CURRENT GAME STATE
    if (gameState === walk || gameState === dialogue || gameState === respond) {
        mapEnabledDraw();
    }

    //CHECK IF DIALOGUE BOX/TEXT SHOULD BE DRAWN IN CURRENT GAME STATE
    if (gameState === dialogue || gameState === respond) {
        dialogueDraw();
    }

    //Updates each frame for use in timer (see utilities.js)
    count++;
}

function mapEnabledDraw() {

    if (!transitioning && !phoneCall) {
        switchState(dialogue);
        startDialogue(mcsweeney);
        phoneCall = true;
    }

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
        if (activeNPCs[x] != undefined) {
            if (activeNPCs[x].active) {
                activeNPCs[x].display();
                //activeNPCs[x].displayName(); // FOR DEBUGGING
            }
        }
    }

    if (currentLevel === exterior) {
        if (player.tileY >= 6) {
            player.display();
        }
    }
}

