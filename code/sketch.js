let debug = false;

function preload() {
    textures[0] = loadImage("art/tiles/grassy.png")
    textures[1] = loadImage("art/tiles/stone.png")

    player.sprite = loadImage('art/characters/testPlayer.png')
    testNPCSprite = loadImage('art/characters/testNPC.png') 
}

function setup() {
    state = walk;
    createCanvas(1000, 500)
    createTileMap();

    testNPC = new NPC(testNPCSprite, 11, 3, testDialogue);
    console.log(npcs);
    
}

function draw() {
    handleState()
    background(255)

    if (state === walk || state === dialogue) {
        mapEnabledDraw();
    }

    if (state === dialogue) {
        console.log("Dialogue draw box")
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
    player.display() //display player
    testNPC.display();


    //DEBUG CODE
    if (debug) {
        loopTilesAndRunFunc(tile => tile.debug()) //Adds grid to tileMap
        console.log("current state is: " + state)
    }
}



function keyPressed() {

    //IF PLAYER PRESSES SPACE KEY, SWITCHES BETWEEN DIALOGUE AND WALK STATE (FOR TESTING)

    let spacebar = 32;
    let shift = 16;
    let slash = 191;

    if (keyCode === spacebar) {
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
                    break;
            }
        }
    }

    //TOGGLES DEBUG DISPLAY FOR MAP
    if (keyCode === slash) {
        debug = !debug;
    }

    //TOOGLES BETWEEN WALK AND DIALOGUE STATES
    if (keyCode === shift) { // FOR DEBUG
        if (state === walk) {
            state = dialogue;
        } else if (state === dialogue) {
            state = walk;
        }
    }
}