//DIALOGUE BOX VISUAL PROPERTIES VARIABLES
let boxOriginX = tileSize * 2; //x positions for box on screen
let boxOriginY; //y positions for box on screen
let boxSizeX = (tilesX - 4) * tileSize; //sets box length
let boxSizeY = tileSize * 5; //sets box height
let cornerRadius = 30; //variable for smoothing dialogue box corners
let boxTextPadding = 50;



//FUNCs TO SETUP DIALOGUE BOX
function dialogueDraw() { //draw function for dialogue
    drawDialogueBox();

    if (state = dialogue) {
        drawText();
    }
}



function drawDialogueBox() { //DRAWS BOX ON SCREEN
    //SET boxOriginY BY PLAYER POSITION
    if (player.yPos <= (tilesY/2) * tileSize) {
        //BOX BELOW PLAYER
        boxTextPadding = 50;
        boxOriginY = tileSize * 6;
    } 
    else {
        boxTextPadding = 70;
        boxOriginY = 0 - tileSize; 
    }


    //DRAW BOX
    stroke(255, 131, 131); //soft red
    strokeWeight(10);
    fill(255, 245, 116); //soft yellow
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
    
}

function drawText() { //DRAWS TEXT TO BOX
    let dialogueToDisplay = currentNode.s.name + ": " + currentNode.m; // sets text for each node

    textSize(18)
    strokeWeight(0)
    textStyle("bold")
    stroke(255, 131, 131);
    fill(131, 105, 179);
    text(dialogueToDisplay, boxOriginX + boxTextPadding, boxOriginY + boxTextPadding, boxSizeX - (boxTextPadding*1.5), boxSizeY - boxTextPadding);
}

function createButtons() {

    let buttonOriginX = 720;
    let buttonOriginY = tileSize;
    let buttonSizeX = tileSize*4.5;
    let buttonSizeY = tileSize*2;

    rect(buttonOriginX, buttonOriginY, buttonSizeX, buttonSizeY)
}

//SETS TEXT FOR DIALOGUE

let currentEvent;
let currentNode;

let responseText;
let dialogueToDisplay;


function startDialogue(npc) {
    currentEvent = dialogueNodes[npc.startDialogueNode]; //Gets the index of the start Node for NPC and sets it to the currentNode
    currentNode = 0;
}

function handleNextDialogueNode() {
    if (currentNode.answer != null) {
        responseText = currentNode.answer;
        handleResponseText(currentNode.answer);
    }
}

function handleResponseText(response) {
    state = response;

    for (x = 0; x < response.length; x++) {
        id = x + 1;
        let buffer = 0;
        if (x > 0) { buffer = 20; }
        text(x + ": " + response[x].m, boxOriginX + boxTextPadding, boxOriginY + boxTextPadding + buffer)
    }

}

function endDialogue(nextState) {
    state = nextState;
}

//CREATE DIALOGUE NODES

let dialogueNodes = [];
let testNode;
let proceed = 0;
let response = 1;
let end = 2;


testDialogueEvent1 = [
        {   s: testNPC,
            m: "Hello, I'm the first" + testNPC.name,},
        
        {   s: testNPC,
            m: "How are you?",
            answer: [ 
                {m: "I'm good", next: "responseGood"},
                {m: "I'm bad", next: "responseBad"}
             ]
        },

        {
            s: testNPC,
            label: "responseGood",
            m: "oh yay",
            next: "end",
            func: changeNode(s)
        },

        {
            s: testNPC,
            label: "responseBad",
            m: "oh no! Well maybe my friend can help.",
            next: "end",
            func: activateNPC(testNPC2)
        }
    ]

function createDialogueNodes() {

    
    //NODES 0-19: TestNPC
    new DialogueNode(
        testNPC, //speaker object
        "Hello, I'm the first " + testNPC.name, //string to display
        0, //ID for node
        1, //next node
        null, //ID to change startNode of an NPC; null = end dialogue
        null, //calls function
        null, //parameter for function
        null //responseNode
    )

    new DialogueNode(
        testNPC, //speaker object
        "I just started saying something else!", //string to display
        1, //ID for node
        null, //ID for nextNode
        2, //ID to change startNode of an NPC; null = end dialogue
        null,//ID to change startNode of an NPC; null = end dialogue
        null, //calls function
        null, //parameter for function
        null //responseNode
    )

    new DialogueNode(
        testNPC,
        "Sometimes if you talk to me more than once, I'll say something new! But this is my last line I can activate by myself. Hey, where did that guy come from?",
        2,
        null,
        null,
        activateNPC,
        testNPC2,
        null
    )

    new DialogueNode(
        testNPC,
        "Hey, my dialogue just got changed by that guy!",
        3,
        null,
        null,
        null
    )

    //NODES 20-39: TestNPC 2
    new DialogueNode(
        testNPC2,
        "I have my own dialogue as well!",
        20,
        21,
        null,
        null
    )

    new DialogueNode(
        testNPC2,
        "I've just changed the startNode on that other guy",
        21,
        null,
        3,
        null
    )
}  

let responseNodes = [];

function createResponseNode() {
    new responseNode(
        "this is a response",
        0,
        4,
        null
    )
}

class DialogueNode {
    constructor(npc, text, dialogueID, link, setStartNode, func, param1, responseNode) {
        this.npc = npc; //sets speaker name
        this.text = text; //string containing dialogue
        this.dialogueID = dialogueID; //index of dialogue
        this.link = link; // link to next dialogueNode; set to null if no dialogue
        this.setStartNode = setStartNode; //use to modify the startNode for dialogue of NPC; set to null if no change required
        this.func = func;
        this.param1 = param1;
        this.responseNode = responseNode;

        dialogueNodes[dialogueID] = this;
    }
}

class responseNode {
    constructor(text, responseID, link, func) {
        this.text = text;
        this.responseID = responseID;
        this.link = link;
        this.func = func;

        responseNodes[responseID] = this;
    }
}