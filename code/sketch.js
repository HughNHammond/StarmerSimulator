let debug = false;

function preload() {
    textures[0] = loadImage("art/tiles/grassy.png")
    textures[1] = loadImage("art/tiles/stone.png")

    player.sprite = loadImage('art/characters/testPlayer.png')
    testNPCSprite = loadImage('art/characters/testNPC.png') 
}

function setup() {
    //Player Object created as object so not here
    //fullscreen(true);
    

    state = walk; //Sets initial state

    createCanvas(tilesX*tileSize, tilesY*tileSize)

    createTileMap(); //Creates the TileMap (in tilemap.js)


    //CREATE NPCs
    createNPCs();


    //CREATE DIALOGUEs
    createDialogueNodes();
    
}

function draw() {
    handlePlayState()
    background(255)

    if (state === walk || state === dialogue) {
        mapEnabledDraw();
    }

    if (state === dialogue) {
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
        console.log("current state is: " + state)
    }
}

//KEYS
let controls = {
    //Directions
    up: 87,
    down: 83,
    left: 65,
    right: 68,

    //Select
    spacebar: 32,

    //Debug
    shift: 16,
    slash: 191
}

function keyPressed() {

    //IF PLAYER PRESSES SPACE KEY, SWITCHES BETWEEN DIALOGUE AND WALK STATE (FOR TESTING)

    if (keyCode === controls.spacebar && state != dialogue) {
        //CHECKS IF PLAYER IS NEAR NPC AND INITIATES DIALOGUE
        for (let npc = 0; npc < npcs.length; npc++) {
            let npcX = npcs[npc].tileX - player.tileX;
            let npcY = npcs[npc].tileY - player.tileY;
        
            switch (`${npcX},${npcY}`) { //the `` here creates a string template, where it takes the value of dx and dy
                                     //and creates a string with those values.
                case "0,-1": // NPC is above the player
                case "0,1":  // NPC is below the player
                case "1,0":  // NPC is to the right of the player
                case "-1,0": // NPC is to the left of the player
                    console.log("npc found!");
                    state = dialogue;
                    startDialogue(npcs[npc]);
                    break;
            }
        }
    } else if (keyCode === controls.spacebar && state === dialogue && !response) {
        handleNextDialogueNode(); //checks whether to end Dialogue or move to next Node
    } else if (keyCode === controls.spacebar && state === dialogue && response) {
        console.log("response")
        currentNode = currentEvent[currentNode.info.response[currentSelection].goto];
        currentSelection = 0;
        response = false;
    }

    if (response) {
        if (keyCode === controls.up) {
        currentSelection--
        }
        else if (keyCode === controls.down) {
        currentSelection++
        }
    }

    //TOGGLES DEBUG DISPLAY FOR MAP
    if (keyCode === controls.slash) {
        debug = !debug;
    }

    //TOOGLES BETWEEN WALK AND DIALOGUE STATES FOR DEBUG
    if (keyCode === controls.shift) { // FOR DEBUG
        if (state === walk) {
            state = dialogue;
        } else if (state === dialogue) {
            state = walk;
        }
    }
}

function mousePressed() {
    console.log(mouseHovering)
    
    if (state === dialogue && !response && mouseHovering === null) {
        handleNextDialogueNode();
    }

    if (mouseHovering != null) {
        console.log("response")
        currentNode = mouseHovering;
        mouseHovering = null;
        response = false;
    }
    

}