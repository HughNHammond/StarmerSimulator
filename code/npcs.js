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

let reporter1;
let reporter2;
let reporter3;
let reporter4;

let inactive = 0;
let active = 1;
//FUNCTIONS

function createNPCs() {
    streeting = new NPC("WES STREETING", streetingSprite, 3, 4, 0, active, true);
    npcs[streeting.characterID] = streeting;

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
    streeting.dialogueEvent = streetingDay1;
    reeves.dialogueEvent = reevesDay1;
    kendall.dialogueEvent = kendallDay1;
    mcsweeney.dialogueEvent = mcsweeneyCall1;
    podium.dialogueEvent = economySpeech;
}

function activateNPC(npc) { 
    npc.active = active;
    activeNPCs.push(npc)
}

function deactivateNPC(npc) {
    npc.active = inactive;
    activeNPCs.slice(npc, 1);
}

function drawNPCs() {
    for (x = 0; x < npcs.length; x++) {
        //npcs[x].handleActiveState()

    }


    displayNPCs();
}

class NPC {
    constructor(name, sprite, tileX, tileY, characterID, active, collision) {
        this.name = name;
        this.sprite = sprite
        
        this.startTileX = tileX;
        this.startTileY = tileY;
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;

        this.size = tileSize;
        this.characterID = characterID;

        this.dialogueEvent; //What dialogue they will start when dialogue is started
        this.currentNode;


        this.active = active;

        this.collision = collision //checks if NPC should trigger collisions
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }

    displayName() {
        textFont(dialogueFont)
        fill(0, 0, 0);
        textSize(10);
        textAlign(CENTER);
        textStyle(NORMAL);
        noStroke();
        text(this.name, this.xPos + tileSize/2, this.yPos - 2);
    }
}