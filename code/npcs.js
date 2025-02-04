let npcs = [];

let testNPC;
let testNPCSprite;

class NPC {
    constructor(sprite, tileX, tileY, dialogueObject) {
        this.sprite = sprite;
        this.tileX = tileX;
        this.tileY = tileY;
        this.xPos = tileX * tileSize;
        this.yPos = tileY * tileSize;
        this.size = tileSize;
        this.dialogueObject = dialogueObject;

        npcs.push(this)
    }

    display() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    }
}