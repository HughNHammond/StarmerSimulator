//VARIABLE FOR ALL NPCs
let npcs = [];
let activeNPCs = [];

//CREATE SPECIFIC CHARACTERS
let streeting; //name
let streetingSprite; //sprite
let reeves;
let reevesSprite;
let kendall;
let kendallSprite;
let mcsweeney;

//DISPLAY SETTINGS
let inactive = 0; //do not display sprite
let active = 1; //display sprite

function createNPCs() {
    //NPCs are created on setup.
    //NPC required parameters: name, sprite, tileX, tileY, characterID, display(active/inactive), collidable (true/false)
    streeting = new NPC("WES STREETING", streetingSprite, 3, 4, 0, active, true);
    npcs[streeting.characterID] = streeting; //Upon creation must be added to npcs array, with characterID as index

    reeves = new NPC("RACHEL REEVES", reevesSprite, 5, 3, 1, active, true)
    npcs[reeves.characterID] = reeves;

    kendall = new NPC("LIZ KENDALL", kendallSprite, 7, 4, 2, active, true)
    npcs[kendall.characterID] = kendall

    mcsweeney = new NPC("MORGAN MCSWEENEY", null, null, null, 3, inactive, false)
    npcs[mcsweeney.characterID] = mcsweeney;

    podium = new NPC("PODIUM", podiumSprite, 5, 5, 4, active, false)
    npcs[podium.characterID] = podium;
}

function attachDialogueEventsToNPCs() {
    //As NPCs are created in setup(), this is called afterwards to attach dialogue to relevant NPCs
    streeting.dialogueEvent = streetingDay1;
    reeves.dialogueEvent = reevesDay1;
    kendall.dialogueEvent = kendallDay1;
    mcsweeney.dialogueEvent = mcsweeneyCall1;
    podium.dialogueEvent = economySpeech;
}

function activateNPC(npc) {
    //Not currently used, but call to turn on display for a sprite.
    npc.active = active;
    activeNPCs.push(npc)
}

function deactivateNPC(npc) {
    //Not currently used, but call to turn off dispaly for a sprite.
    npc.active = inactive;
    activeNPCs.slice(npc, 1);
}

function drawNPCs() {
    //Any functions that need to run every frame related to NPCs are called here
    displayNPCs();
}

class NPC {
    constructor(name, sprite, tileX, tileY, characterID, active, collision) {
        this.name = name; //String, name of character (displayed in dialogue)
        this.sprite = sprite //Image
        this.size = tileSize; //All sprites same size as tileSize
        
        this.startTileX = tileX; //Start Location upon load
        this.startTileY = tileY; //Start location upon load
        this.tileX = tileX; //Seperate location in case position is changed (currently unused);
        this.tileY = tileY; //Seperate location in case position is changed (currently unused);
        this.xPos = tileX * tileSize; //Convert tileX to pixel position
        this.yPos = tileY * tileSize; //Convert tileY to pxiel position

        
        this.characterID = characterID; //Index ID used for storing in npcs array.
        this.dialogueEvent; //What dialogue they will start when dialogue is started
        this.currentNode;

        this.active = active; //Whether to display the sprite
        this.collision = collision //checks if NPC should trigger collisions with player
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
        if (debug) {
            this.displayName(); //displays character name over head if debug is active
        }
    }

    displayName() {
        //Debug function that displays name of NPC over head
        textFont(dialogueFont)
        fill(0, 0, 0);
        textSize(10);
        textAlign(CENTER);
        textStyle(NORMAL);
        noStroke();
        text(this.name, this.xPos + tileSize/2, this.yPos - 2);
    }
}