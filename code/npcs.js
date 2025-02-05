//VARIABLE FOR ALL NPCs
let npcs = [];
let activeNPCs = [];

//CREATE SPECIFIC CHARACTERS
let testNPC; //name
let testNPC2;
let testNPCSprite; //sprite


//FUNCTIONS

function createNPCs() {
    testNPC = new NPC("Test NPC 1", testNPCSprite, 4, 1, 0, 0, true);
    npcs[testNPC.characterID] = testNPC;

    testNPC2 = new NPC("Test NPC 2", testNPCSprite, 6, 1, 20, 1, false)
    npcs[testNPC2.characterID] = testNPC2;
}

function activateNPC(npc) { 
    npc.active = true;
}

function drawNPCs() {
    for (x = 0; x < npcs.length; x++) {
        npcs[x].handleActiveState()

    }


    displayNPCs();
}

function displayNPCs() {
    for (x = 0; x < activeNPCs.length; x++) {
            activeNPCs[x].display();
    }
}


class NPC {
    constructor(name, sprite, tileX, tileY, startDialogueNode, characterID, active) {
        this.name = name;
        this.sprite = sprite;
        
        
        this.startTileX = tileX;
        this.startTileY = tileY;
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;

        this.size = tileSize;
        this.characterID = characterID;

        this.startDialogueNode = startDialogueNode; //What dialogue they will start when dialogue is started
        this.currentDialogueNode = startDialogueNode;


        this.active = active;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }

    handleActiveState() {
        if (this.active) {
            activeNPCs[this.characterID] = this;
            console.log("activated")
        }
    }
}