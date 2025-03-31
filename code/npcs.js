//VARIABLE FOR ALL NPCs
let npcs = [];
let activeNPCs = [];

//CREATE SPECIFIC CHARACTERS
let streeting; //name
let reeves;
let streetingSprite; //sprite
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

    reeves = new NPC("RACHEL REEVES", streetingSprite, 5, 0, 1, inactive, true)
    npcs[reeves.characterID] = reeves;

    //mcsweeney = new NPC("MORGAN MCSWEENEY", streetingSprite, 6, 8, 2, active, true)
    //npcs[mcsweeney.characterID] = mcsweeney;

    podium = new NPC("PODIUM", podiumSprite, 5, 5, 3, active, false)
    npcs[podium.characterID] = podium;
}

function attachStartNodesToNPCs() {
    streeting.startNode = streetingDay1;
    reeves.startNode = reevesDay1;
    //mcsweeney.startNode = exampleResponse;
    podium.startNode = economySpeech;
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




function setStartNode(npc, event) {
    npc.startNode = event;
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

        this.startNode; //What dialogue they will start when dialogue is started
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