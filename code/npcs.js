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
    streeting = new NPC("Wes Streeting", streetingSprite, 3, 4, responseEvent1, 0, active);
    npcs[streeting.characterID] = streeting;

    reeves = new NPC("Rachel Reeves", streetingSprite, 8, 3, endStateEvent, 1, inactive)
    npcs[reeves.characterID] = reeves;

    mcsweeney = new NPC("Morgan McSweeney", streetingSprite, 6, 3, endStateEvent, 2, active)
    npcs[mcsweeney.characterID] = mcsweeney;



    //REPORTERS
    
    reporter1 = new NPC("Reporter #1", null, null, null, pressEvent1, 10, inactive);
    npcs[reporter1.characterID] = reporter1;

    reporter2 = new NPC("Reporter #2", null, null, null, pressEvent1, 10, inactive);
    npcs[reporter2.characterID] = reporter2;

    reporter3 = new NPC("Reporter #3", null, null, null, pressEvent1, 10, inactive);
    npcs[reporter3.characterID] = reporter3;

    reporter4 = new NPC("Reporter #4", null, null, null, pressEvent1, 10, inactive);
    npcs[reporter4.characterID] = reporter4;


    for (let npc in npcs) {
        if (npcs[npc].active) {activeNPCs.push(npcs[npc]);}
    }
}

function activateNPC(npc) { 
    npc.active = active;
    activeNPCs.push(npc)
}

function deactivateNPC(npc) {
    npc.active = inactive;
    activeNPCs.pop(npc);
}

function drawNPCs() {
    for (x = 0; x < npcs.length; x++) {
        //npcs[x].handleActiveState()

    }


    displayNPCs();
}

function displayNPCs() {
    for (x = 0; x < activeNPCs.length; x++) {
        if (activeNPCs[x].active)
            activeNPCs[x].display();
            activeNPCs[x].displayName();
    }
}


class NPC {
    constructor(name, sprite, tileX, tileY, startNode, characterID, active) {
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

        this.startNode = startNode; //What dialogue they will start when dialogue is started
        this.currentNode = startNode;


        this.active = active;
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