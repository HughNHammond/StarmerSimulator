//VARIABLE FOR ALL NPCs
let npcs = [];
let activeNPCs = [];

//CREATE SPECIFIC CHARACTERS
let testNPC; //name
let testNPC2;
let testNPCSprite; //sprite


//FUNCTIONS

function createNPCs() {
    testNPC = new NPC("Wes Streeting", testNPCSprite, 3, 7, responseEvent1, 0, true);
    npcs[testNPC.characterID] = testNPC;

    testNPC2 = new NPC("Rachel Reeves", testNPCSprite, 4, 7, testEvent3, 1, false)
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
            activeNPCs[x].displayName();
    }
}


class NPC {
    constructor(name, sprite, tileX, tileY, startNode, characterID, active) {
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

        this.startNode = startNode; //What dialogue they will start when dialogue is started
        this.currentNode = startNode;


        this.active = active;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }

    displayName() {
        fill("black");
        textSize(10);
        textAlign(CENTER);
        text(this.name, this.xPos + tileSize/2, this.yPos - 2);
    }

    handleActiveState() {
        if (this.active) {
            activeNPCs[this.characterID] = this;
        }
    }
}