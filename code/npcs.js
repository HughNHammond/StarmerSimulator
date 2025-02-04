//VARIABLE FOR ALL NPCs
let npcs = [];

//CREATE SPECIFIC CHARACTERS
let testNPC; //name
let testNPCSprite; //sprite


//FUNCTIONS

function createNPCs() {
    testNPC = new NPC("Test NPC", testNPCSprite, 11, 3, 0);
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

        this.startDialogueNode = startDialogueNode;
        this.currentDialogueNode = startDialogueNode;
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }
}