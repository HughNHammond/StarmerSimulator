//INITIAL VARIABLES

//Bool that tracks if debug is active
let debug = false; 

//Empty variables for art
let podium;
let podiumSprite;
let downArrow;
let upArrow;

//Variables for font
let startFont;
let dialogueFont;

//IMAGES
let backgroundImage;
let interiorImage;
let exteriorImage;

//Bespoke bools for one-time events
let phoneCall = false; //if false, call dialgoue will start when game starts.
let pressCompleted = false; //checks if the press event has been finished to end the game

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
    reevesSprite = loadImage("art/characters/reeves.png");
    kendallSprite = loadImage("art/characters/kendall.png");
    podiumSprite = loadImage("art/objects/podium.png")

    //Tilemap images
    interiorImage = loadImage("art/screens/Downing Street Interior.png");
    interior.backgroundImage = interiorImage;
    exteriorImage = loadImage("art/screens/Downing Street Exterior.png");
    exterior.backgroundImage = exteriorImage;

    //UI
    downArrow = loadImage("art/objects/DownArrow.png");
    upArrow = loadImage("art/objects/UpArrow.png");
    wsad = loadImage("art/objects/WSAD.png");
    spacebarSprite = loadImage("art/objects/spacebar.png")

    //Opening Title Image
    startImage = loadImage("art/portraits/startImage.png")

    //Loading Fonts
    startFont = loadFont("font/PressStart2P.ttf")
    dialogueFont = loadFont("font/Pixellari.ttf")
}

function setup() {

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
    attachDialogueEventsToNPCs(); // attaches starting dialogue nodes to each NPC

    //Set and load the first level!
    loadLevel(interior)

    //Set Player Start Position (I want the player to start in a different position when the game starts than the positioned stored in the level object)
    player.xPos = playerStartX * tileSize;
    player.yPos = playerStartY * tileSize;

    //Modifies podium Y position so it does not appear in centre of pile (player therefore appears to stand behind it)
    podium.yPos += (tileSize/2);
}

function draw() {

    background(0) //Black background
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

    //This checks if the level transition has finished and if the initial phone call has taken place. If both are false, the phone call starts.
    if (!transitioning && !phoneCall) {
        switchState(dialogue);
        startDialogue(mcsweeney);
        phoneCall = true;
    }

    //DISPLAY ART
    noSmooth(); //This turns off smoothing on images, which I don't want on pixel art
    image(backgroundImage, 0, 0, width, height) //sets background image
    displayCharacters(); //displays all NPCs who should current be loaded.

    //DEBUG CODE
    if (debug) {
        displayTileMapDebug(); //Adds grid to tileMap
        console.log("current state is: " + gameState) // prints number of current state to console.
    }
}

function displayCharacters() {
    //DRAW PLAYER
    player.draw()

    //DRAW CURRENTLY ACTIVELY NPC SPRITES
    for (x = 0; x < activeNPCs.length; x++) {
        if (activeNPCs[x] != undefined) {
            if (activeNPCs[x].active) {
                activeNPCs[x].display();
                //activeNPCs[x].displayName(); // FOR DEBUGGING
            }
        }
    }

    //HANDLE PODIUM/PLAYER DISPLAY
    if (currentLevel === exterior) {
        if (player.tileY >= 6) {
            //If the player's tileY is less than 6 (the podium location), display the player again so they appear on top of the podium
            player.display();
        }
    }
}

