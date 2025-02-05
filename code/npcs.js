//VARIABLE FOR ALL NPCs
let npcs = [];

//CREATE SPECIFIC CHARACTERS
let testNPC; //name
let testNPC2;
let testNPCSprite; //sprite


//FUNCTIONS

function createNPCs() {
    testNPC = new NPC("Test NPC 1", testNPCSprite, 4, 1, 0);
    testNPC2 = new NPC("Test NPC 2", testNPCSprite, 6, 1, 20)
}


class NPC {
    constructor(name, sprite, tileX, tileY, startDialogueNode) {
        this.name = name;
        this.sprite = sprite;
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;
        this.size = tileSize;

        npcs.push(this);

        this.startDialogueNode = startDialogueNode; //What dialogue they will start when dialogue is started
        this.currentDialogueNode = startDialogueNode;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }
}