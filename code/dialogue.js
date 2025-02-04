//DIALOGUE BOX VISUAL PROPERTIES VARIABLES
boxOriginX = tileSize * 3; //x positions for box on screen
boxOriginY = tileSize * 6; //y positions for box on screen
boxSizeX = (tilesX - 6) * tileSize; //sets box length
boxSizeY = tileSize * 5; //sets box height
cornerRadius = 30; //variable for smoothing dialogue box corners
boxTextPadding = 50;

let dialogueToDisplay;
let currentNode;



//FUNCs TO SETUP DIALOGUE BOX
function dialogueDraw() {
    drawBox();
    drawText();
}

function drawBox() {
    stroke(255, 131, 131); //soft red
    strokeWeight(10);
    fill(255, 245, 116); //soft yellow
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
}

//SETS TEXT FOR DIALOGUE
function startDialogue(npc) {
    currentNode = dialogueNodes[npc.currentDialogueNode];
}

function handleNextDialogueNode() {
    if (currentNode.link === null) {
        endDialogue(walk);
    }
    else {
        currentNode = dialogueNodes[currentNode.link];
    }
}

function drawText() {

    dialogueToDisplay = currentNode.speaker + ": " + currentNode.text; // sets text for each node

    textSize(20)
    strokeWeight(4)
    stroke("black");
    fill("white");
    text(dialogueToDisplay, boxOriginX + boxTextPadding, boxOriginY + boxTextPadding);
    console.log(currentNode.link)
}

function endDialogue(nextState) {
    state = nextState;
}

//CREATE DIALOGUE NODES

let dialogueNodes = []

function createDialogueNodes() {

    //DIALOGUE FOR TestNPC
    new DialogueNode(testNPC.name,
                        "Hello, this is some dialogue.",
                        0, //ID for node
                        1) //next node

    new DialogueNode(testNPC.name,
                        "I just started saying something else!",
                        1, //ID for node
                        null) //null = end dialogue
}

class DialogueNode {
    constructor(speaker, text, dialogueID, link) {
        this.speaker = speaker;
        this.text = text;
        this.dialogueID = dialogueID;
        this.link = link;

        dialogueNodes[dialogueID] = this;
    }
}