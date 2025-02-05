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
function dialogueDraw() { //draw function for dialogue
    drawBox();
    drawText();
}

function drawBox() { //DRAWS BOX ON SCREEN
    stroke(255, 131, 131); //soft red
    strokeWeight(10);
    fill(255, 245, 116); //soft yellow
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
}

function drawText() { //DRAWS TEXT TO BOX
    dialogueToDisplay = currentNode.npc.name + ": " + currentNode.text; // sets text for each node

    textSize(20)
    strokeWeight(4)
    stroke("black");
    fill("white");
    text(dialogueToDisplay, boxOriginX + boxTextPadding, boxOriginY + boxTextPadding, boxSizeX - (boxTextPadding*1.5), boxSizeY - boxTextPadding);
    //console.log(currentNode.link)
}

//SETS TEXT FOR DIALOGUE
function startDialogue(npc) {
    currentNode = dialogueNodes[npc.startDialogueNode]; //Gets the index of the start Node for NPC and sets it to the currentNode
}

function handleNextDialogueNode() {
    //1. Checks whether the current dialogue has a value to reset the startDialogueNode of an NPC. If yes, it checks which NPC
    //   the dialogueNode refers to and resets their startDialogueNode. If null, does nothing.
    if (currentNode.setStartNode != null) {
        let nextStartNode = currentNode.setStartNode; //temp variable for index of next StartNode

        dialogueNodes[nextStartNode].npc.startDialogueNode = nextStartNode; //gets NPC object for next node and sets their dialogueStartNode to new node
        console.log(testNPC)
    }

    //2. Checks if dialogueNode has link; if null, ends dialogue.
    if (currentNode.link === null) {
        endDialogue(walk); // ends dialogue and returns to walk state
    }
    //3. Or if not null, sets currentNode to the linked node.
    else {
        currentNode = dialogueNodes[currentNode.link]; //sets the next Dialogue to display
    }
}

function endDialogue(nextState) {
    state = nextState;
}

//CREATE DIALOGUE NODES

let dialogueNodes = []

function createDialogueNodes() {

    //NODES 0-19: TestNPC
    new DialogueNode(testNPC, //speaker object
                        "Hello, I'm the first " + testNPC.name, //string to display
                        0, //ID for node
                        1, //next node
                        null //ID to change startNode of an NPC; null = end dialogue
    )

    new DialogueNode(testNPC, //speaker object
                        "I just started saying something else!", //string to display
                        1, //ID for node
                        null, //ID for nextNode
                        2 //ID to change startNode of an NPC; null = end dialogue
    )

    new DialogueNode(testNPC,
                        "Sometimes if you talk to me more than once, I'll say something new! But this is my last line I can activate by myself",
                        2,
                        null,
                        null
    )

    new DialogueNode(testNPC,
                        "Hey, my dialogue just got changed by that guy!",
                        3,
                        null,
                        null
    )

    //NODES 20-39: TestNPC 2
    new DialogueNode(testNPC2,
                        "I have my own dialogue as well!",
                        20,
                        21,
                        null
    )

    new DialogueNode(testNPC2,
                        "I've just changed the startNode on that other guy",
                        21,
                        null,
                        3
    )
}  



class DialogueNode {
    constructor(npc, text, dialogueID, link, setStartNode) {
        this.npc = npc; //sets speaker name
        this.text = text; //string containing dialogue
        this.dialogueID = dialogueID; //index of dialogue
        this.link = link; // link to next dialogueNode; set to null if no dialogue
        this.setStartNode = setStartNode; //use to modify the startNode for dialogue of NPC; set to null if no change required

        dialogueNodes[dialogueID] = this;
    }
}