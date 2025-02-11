//DIALOGUE BOX VISUAL PROPERTIES VARIABLES
let boxOriginX = tileSize * 2; //x positions for box on screen
let boxOriginY; //y positions for box on screen
let boxSizeX = (tilesX - 4) * tileSize; //sets box length
let boxSizeY = tileSize * 5; //sets box height
let cornerRadius = 30; //variable for smoothing dialogue box corners
let boxTextPadding = 50; //pads text to make sure it appears within the text box
let textOriginX = boxOriginX + boxTextPadding; //sets origin of text for response
let textOriginY = boxOriginY + boxTextPadding; // sets origin of text for response

let dialogueToDisplay;
let nextNode;
let currentNode;


//FUNCs TO SETUP DIALOGUE BOX
function dialogueDraw() { //draw function for dialogue
    drawDialogueBox();

    //CODE TO CHECK HOW TO DRAW TEXT
    if (!response) {
        drawText(); //Draw NPC dialogue
    }
    else {
        drawResponse(); //Create dialogue selection menu
    }
}

function drawDialogueBox() { //DRAWS BOX ON SCREEN
    //SET boxOriginY BY PLAYER POSITION
    if (player.yPos <= (tilesY/2) * tileSize) {
        //BOX BELOW PLAYER
        boxTextPadding = 50;
        boxOriginY = (tileSize * 6);
        textOriginY = boxOriginY + boxTextPadding; 
    } 
    else {
        boxTextPadding = 70;
        boxOriginY = -30; 
        textOriginY = boxOriginY + boxTextPadding;
    }


    //DRAW BOX
    stroke(5, 93, 169); //soft red
    strokeWeight(10);
    fill(228, 0, 59); //soft yellow
   
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
    
}

function drawText() { //DRAWS TEXT TO BOX
let dialogueToDisplay = currentNode.npc.name + ": " + currentNode.text; // sets text for each node

    textSize(18)
    strokeWeight(0)
    textStyle("bold")
    stroke(255, 131, 131);
    fill(255,255,255);
    textAlign(LEFT)
    text(dialogueToDisplay, boxOriginX + boxTextPadding, boxOriginY + boxTextPadding, boxSizeX - (boxTextPadding*1.5), boxSizeY - boxTextPadding);
}

//--------------------------------//
//FUNCTIONS TO HANDLE DIALOGUE PROGRESSION

//SETS TEXT FOR DIALOGUE
function startDialogue(npc) {
    currentEvent = npc.startNode;
    currentNode = npc.startNode[0]; //Gets the index of the start Node for NPC and sets it to the currentNode
}

function handleNextDialogueNode() {

    //THIS IS CALLED WHENEVER THE MOUSE OR SPACEBAR IS CLICKED AND NOT IN A RESPONSE STATE
    //IT RUNS ONCE IMMEDIATELY UPON BEING CLICKED, SO IT IS ONLY UPDATED AT THE MOMENT BEFORE
    //THE UPDATE TAKES PLACE

    //1. Check function
    if (currentNode.info.func != null) {
        if (Array.isArray(currentNode.info.param)) { //checks to see if param is an array (i.e. multiple parameters)
            currentNode.info.func(...currentNode.info.param); //passes each value in array as individual argument
        }
        else {
            currentNode.info.func(currentNode.info.param); //passes *one* argument
        }
    }

    //2. Check if response node available
    if (currentNode.info.response != null) {
        currentSelection = 0;
        response = true;
        return;
    } else {
        response = false;
    }

    //3. Checks if dialogueNode has link; if null, ends dialogue.
    //4. Or if not null, sets currentNode to the linked node.
    if (currentNode.info.link != null) {
        nextNode = currentEvent[currentNode.info.link]; //sets the next Dialogue to display
        updateDialogueNode()
    }
    else if (currentNode.info.link === null) {
        endDialogue(walk); // ends dialogue and returns to walk state
    }
}

function updateDialogueNode() {
    currentNode = nextNode;
}

//--------------------------------//
//FUNCTIONS TO HANDLE RESPONSES


let mouseHovering = null;

let response = false; //bool to check if we are in response or not.
let currentSelection = 0;

function drawResponse() {
    //1. Set box values
    //2. Run for loop
    //3 Check where mouse is then set fill
    //4. draw box
    //5. Add text

    currentSelection = clamp(currentSelection, 0, currentNode.info.response.length - 1);

    for (let x = 0; x < currentNode.info.response.length; x++) {
        
        selectionOriginX = textOriginX - 19;
        selectionOriginY = textOriginY + (x * tileSize) - 30;
        selectionSizeX = boxSizeX - tileSize;

        noStroke();

        //Set Selected
        if (currentSelection === x) {
            //Cursor over selection
            fill(255, 255, 255);
            rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
            fill(0, 0, 0);
        } else {
            noFill();
            rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
            fill(255, 255, 255);
        }

        //mouseControls(x);
        


        //fill(255, 255, 255) //TEMP FILL
        textSize(18)
        textStyle("bold")
        textAlign(LEFT)
        strokeWeight(0)
        stroke("black");
        text(x + 1 + ". " + currentNode.info.response[x].r, textOriginX, textOriginY + (x * tileSize))
    }
}


function mouseControls(x) {
    let mouseHover = mouseX > selectionOriginX &&
        mouseX < selectionOriginX + selectionSizeX &&
        mouseY > selectionOriginY &&
        mouseY < selectionOriginY + tileSize;

    // strokeWeight(1); FOR DEBUG (draws line around selectable boxes)
    noStroke();



    if (mouseHover) {
        //Cursor over selection
        fill(255, 255, 255);
        rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
        fill(0, 0, 0);

        mouseHovering = currentEvent[currentNode.info.response[x].goto];

    } else {
        noFill();
        rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
        fill(255, 255, 255);
    }
}

function endDialogue(nextState) {
    state = nextState;
}

function setStartNode(npc, node) {
    npc.startNode = node;
}

//--------------------------------//
//DIALOGUE NODES


//Variables for each dialogue event (each one contains dialogueNodes and responseNodes)
let dialogueNodes = []
let testEvent = [];
let testEvent2 = [];
let testEvent3 = [];

let responseEvent1 = [];

//FUNCITON THAT CREATES DIALOGUE NODES AT RUN-TIME AND ASSIGNS THEM TO A POSITION IN EACH EVENT ARRAY

function createDialogueNodes() {

    testEvent = [
    //NODES 0-19: TestNPC
        new DialogueNode(
            testNPC, //speaker object
            "Hello, I'm the first " + testNPC.name + ".", //string to display
            0, //ID for node
            testEvent,
            {
                link: 1,
            }
        ),

        new DialogueNode(
            testNPC,
            "Here is some dialogue. This one changes my next node!",
            1,
            testEvent,
            {
                link: null,
                func: setStartNode,
                param: [testNPC, testEvent2]
            }
        ),
    ]

    testEvent2 = [
        new DialogueNode(
            testNPC,
            "Oh, I have some new dialogue. Hey, who's that?",
            0,
            testEvent2,
            {
                link: null,
                func: activateNPC,
                param: testNPC2
            }
        )
    ]

    testEvent3 = [
        new DialogueNode(
            testNPC2,
            "I have nothing to say to you",
            0,
            testEvent3,
            {
                link: null
            }
        )
    ]

    responseEvent1 = [
        new DialogueNode(
            testNPC,
            "How are you?",
            0,
            responseEvent1,
            {
                response: [
                    {r: "Yeah, I'm ok",
                        goto: 1 
                    },

                    {r: "I'm terrible.",
                        goto: 2
                    },
                    {r: "this is a third response",
                        goto: 1
                    },
                    {r: "and this is a fourht response",
                        goto: 1
                    }
                ]
            }
        ),

        new DialogueNode(
            testNPC,
            "Yay, I'm so glad to hear that",
            1,
            responseEvent1,
            {
                link: null,
            }
        ),

        new DialogueNode(
            testNPC,
            "Oh no, that sucks!",
            2,
            responseEvent1,
            {
                link: 3,
            }
        ),

        new DialogueNode(
            testNPC,
            "Have you considered being inexplicably transphobic?",
            3,
            responseEvent1,
            {
                response: [
                    {r: "No, I'm not a freak, Wes.",
                        goto: 4},
                    {r: "No, becuase I'm not a cunt, Wes",
                        goto: 4}
                    ],
                func: console.log,
                param:"Function worked"
            }
        ),
    ]
}  

//DIALOGUE NODE CLASS
class DialogueNode {
    constructor(npc, text, dialogueID, dialogueEvent, info) {
        this.npc = npc; //sets speaker name
        this.text = text; //string containing dialogue
        //this.dialogueID = dialogueID; //index of dialogue
        this.dialogueEvent = dialogueEvent;
        // this.link = link; // link to next dialogueNode; set to null if no dialogue
        // this.setStartNode = setStartNode; //use to modify the startNode for dialogue of NPC; set to null if no change required
        // this.func = func;
        // this.param1 = param1;
        // this.responseNode = responseNode;

        this.info = info;

        dialogueEvent.push(this);
    }
}

class responseNode {
    constructor(text, responseID, link, func) {
        this.text = text;
        this.responseID = responseID;
        this.link = link;
        this.func = func;
    }
}