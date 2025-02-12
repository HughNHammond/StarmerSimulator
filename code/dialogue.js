//DIALOGUE BOX VISUAL PROPERTIES VARIABLES
let boxOriginX = tileSize * 2; //x positions for box on screen
let boxOriginY; //y positions for box on screen
let boxSizeX = (tilesX - 4) * tileSize; //sets box length
let boxSizeY = tileSize * 5; //sets box height
let cornerRadius = 30; //variable for smoothing dialogue box corners
let boxTextPaddingY = 50; //pads text to make sure it appears within the text box
let boxTextPaddingX = 50;
let textOriginX = boxOriginX + boxTextPaddingX; //sets origin of text for response
let textOriginY = boxOriginY + boxTextPaddingY; // sets origin of text for response

let dialogueToDisplay;
let currentNode;
let currentSelection = 0;

let flipDialogueBox = false;


//FUNCs TO SETUP DIALOGUE BOX
function dialogueDraw() { //draw function for dialogue
    drawDialogueBox();

    //CODE TO CHECK HOW TO DRAW TEXT
    if (gameState === dialogue) {
        drawText(); //Draw NPC dialogue
    }
    else if (gameState === respond) {
        drawResponse(); //Create dialogue selection menu
    }
}

function drawDialogueBox() { //DRAWS BOX ON SCREEN
    //SET boxOriginY BY PLAYER POSITION
 
    if (player.yPos <= (tilesY/2) * tileSize) {
        //BOX BELOW PLAYER
        boxTextPaddingY = 50;
        boxOriginY = height - (tileSize * 4);
        textOriginY = boxOriginY + boxTextPaddingY; 
    }
    else {
        //Box Above player
        boxTextPaddingY = 100;
        boxOriginY = -70; 
        textOriginY = boxOriginY + boxTextPaddingY;
    }

    if (debug && flipDialogueBox) {
        //BOX BELOW PLAYER
        boxTextPaddingY = 50;
        boxOriginY = height - (tileSize * 4);
        textOriginY = boxOriginY + boxTextPaddingY; 
    }
    else if (debug && !flipDialogueBox) {
        //Box Above player
        boxTextPaddingY = 100;
        boxOriginY = -70; 
        textOriginY = boxOriginY + boxTextPaddingY;
    }


    //DRAW BOX
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red
   
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
    text(dialogueToDisplay, boxOriginX + boxTextPaddingX, boxOriginY + boxTextPaddingY, boxSizeX - (boxTextPaddingX*1.5), boxSizeY - boxTextPaddingY);
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

    runFuncFromDialogue(currentNode.info)
    if (gameState != dialogue && gameState != respond) return;

    //2. Check if response node available
    if (currentNode.info.response != null) {
        currentSelection = 0;
        switchState(respond);
        return;
    } else {
        switchState(dialogue);
    }

    //3. Checks if dialogueNode has link; if null, ends dialogue.
    //4. Or if not null, sets currentNode to the linked node.
    if (currentNode.info.link != null) {
        updateDialogueNode(currentEvent[currentNode.info.link]); //sets the next Dialogue to display
    }
    else if (currentNode.info.link === null) {
        endDialogue(walk); // ends dialogue and returns to walk state
    }
}

function updateDialogueNode(nextNode) {
    currentNode = nextNode;
}

//--------------------------------//
//FUNCTIONS TO HANDLE RESPONSES

function drawResponse() {
    //1. Set box values
    //2. Run for loop
    //3 Check where mouse is then set fill
    //4. draw box
    //5. Add text

    currentSelection = clamp(currentSelection, 0, currentNode.info.response.length - 1);

    for (let x = 0; x < currentNode.info.response.length; x++) {
        
        let selectionSizeY = 50;
        selectionOriginX = textOriginX - 19;
        selectionOriginY = textOriginY + (x * selectionSizeY) - 26;
        selectionSizeX = boxSizeX - tileSize;
        

        noStroke();

        //Set Selected
        if (currentSelection === x) {
            //Cursor over selection
            fill(255, 255, 255);
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(0, 0, 0);
        } else {
            noFill();
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(255, 255, 255);
        }

        //fill(255, 255, 255) //TEMP FILL
        textSize(18)
        textStyle("bold")
        textAlign(LEFT)
        strokeWeight(0)
        stroke("black");
        text(x + 1 + ". " + currentNode.info.response[x].r, textOriginX, textOriginY + (x * selectionSizeY))
    }
}

// function mouseControls(x) {
//     let mouseHover = mouseX > selectionOriginX &&
//         mouseX < selectionOriginX + selectionSizeX &&
//         mouseY > selectionOriginY &&
//         mouseY < selectionOriginY + tileSize;

//     // strokeWeight(1); FOR DEBUG (draws line around selectable boxes)
//     noStroke();



//     if (mouseHover) {
//         //Cursor over selection
//         fill(255, 255, 255);
//         rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
//         fill(0, 0, 0);

//         mouseHovering = currentEvent[currentNode.info.response[x].goto];

//     } else {
//         noFill();
//         rect(selectionOriginX, selectionOriginY, selectionSizeX, tileSize, cornerRadius);
//         fill(255, 255, 255);
//     }
// }

function endDialogue(nextState) {
    switchState(nextState)
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

let endStateEvent = []

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
                func: setStartNode,
                param: [testNPC, testEvent2]
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
                    {r: "Fuck off Wes [ENDS DIALOGUE]",
                        goto: null},
                    {r: "Fuck off Wes, but also I hate you [LINKS TO ANOTHER NODE]",
                        goto: 4}
                    ],
            }
        ),

        new DialogueNode(
            testNPC,
            "Yeah, I've never known love.",
            4,
            responseEvent1,
            {
                link: null
            }
        )
    ]

    endStateEvent = [ 
        new DialogueNode (
            testNPC2,
            "Would you like to end the day?",
            0,
            endStateEvent,
            {
                response: [
                    {r: "Not quite yet.",
                        goto: 1 },
                    {r: "Yes please.",
                        goto: 2,
                        func: setTransition,
                        param: [startTransition, endDay] }
                ]
            },
        ),
    
        new DialogueNode (
            testNPC2,
            "Yes, we must grow more first.",
            1,
            endStateEvent,
            {
                link: null
            }
        ),

        new DialogueNode (
            testNPC2,
            "You never loved growth. You only pretened to.",
            2,
            endStateEvent,
            {
                link: null
            }
        )


    ]


}  

//DIALOGUE NODE CLASS
class DialogueNode {
    constructor(npc, text, dialogueID, dialogueEvent, info) {
        this.npc = npc; //sets speaker name
        this.text = text; //string containing dialogue
        //this.dialogueID = dialogueID; //index of dialogue
        this.dialogueEvent = dialogueEvent;

        this.info = info;

        dialogueEvent.push(this);
    }
}