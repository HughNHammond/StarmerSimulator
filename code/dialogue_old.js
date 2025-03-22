//DIALOGUE BOX VISUAL PROPERTIES VARIABLES
let boxOriginX = (tileSize*tilesX)*0.05; //x positions for box on screen
let boxOriginY; //y positions for box on screen
let boxSizeX = (tileSize*tilesX)*0.9; //sets box length
let boxSizeY = (tileSize * tilesX)*0.4; //sets box height
let cornerRadius = 30; //variable for smoothing dialogue box corners
let boxTextPaddingY = 50; //pads text to make sure it appears within the text box
let boxTextPaddingX = 50;
let textOriginX = boxOriginX + boxTextPaddingX; //sets origin of text for response
let textOriginY = boxOriginY + boxTextPaddingY; // sets origin of text for response

let dialogueToDisplay;
let currentNode;
let currentSelection = 0;

let flipDialogueBox = false;

let press = false;

let pressRating = 50;
let currentPublicScore = 20;


//FUNCs TO SETUP DIALOGUE BOX
function dialogueDraw() { //draw function for dialogue
    drawDialogueBox();

    textFont(dialogueFont) //Sets font for dialogue

    //CODE TO CHECK HOW TO DRAW TEXT
    if (gameState === dialogue) {
        drawText(); //Draw NPC dialogue
    }
    else if (gameState === respond) {
        drawResponse(); //Create dialogue selection menu
    }

    if (press) {
        drawPerformanceBox()
    }
}

function drawDialogueBox() { //DRAWS BOX ON SCREEN
    //SET boxOriginY BY PLAYER POSITION
 
    if (player.yPos <= (tilesY/2) * tileSize && !press) {
        //BOX BELOW PLAYER
        boxTextPaddingY = 50;
        boxOriginY = height*0.6
        textOriginY = boxOriginY + boxTextPaddingY; 
    }
    else {
        //Box Above player
        boxTextPaddingY = 100;
        boxOriginY = -40; 
        textOriginY = boxOriginY + boxTextPaddingY - 18;
    }

    if (debug && flipDialogueBox) {
        //BOX BELOW PLAYER
        boxTextPaddingY = 50;
        boxOriginY = height - (height*0.75);
        textOriginY = boxOriginY + boxTextPaddingY; 
    }
    else if (debug && !flipDialogueBox) {
        //Box Above player
        boxTextPaddingY = 100;
        boxOriginY = -70; 
        textOriginY = boxOriginY + boxTextPaddingY - 18;
    }


    //DRAW BOX
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red
   
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
    
}

function drawText() { //DRAWS TEXT TO BOX
    let dialogueToDisplay;
    
    dialogueToDisplay = currentNode.text; // sets text for each node

    textSize(25)
    strokeWeight(0)
    stroke(255, 131, 131);
    fill(255,255,255);
    textAlign(LEFT)
    textStyle("bold")
    text(currentNode.npc.name, textOriginX, textOriginY, boxSizeX - (boxTextPaddingX*1.5), boxSizeY - boxTextPaddingY)
    textStyle("normal")
    text(currentNode.text, textOriginX, textOriginY + 40, boxSizeX - (boxTextPaddingX*1.5), boxSizeY - boxTextPaddingY);
}

//--------------------------------//
//PRESS BOX

function drawPerformanceBox() {
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red

    let boxOriginX = width - 300;
    let boxOriginY = height/2;
    let boxSizeX = 320;
    let boxSizeY = 120;

    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY);

    strokeWeight(1)

    
    stroke(255, 255, 255)
    fill(0, 0, 0)
    text("PRESS RATING: ..........", boxOriginX + 20, boxOriginY + 30)

    rect(boxOriginX + 19, boxOriginY + 40, boxSizeX - 50, 10)
    noStroke()
    fill(5, 93, 169); //labour red
    let perCentPressScore = (boxSizeX - 50) / (100 / pressRating)
    rect(boxOriginX + 19, boxOriginY + 40, perCentPressScore, 10)

    stroke(255, 255, 255)
    fill(0, 0, 0)
    text("PUBLIC RATING: ..........", boxOriginX + 20, boxOriginY + 80)

    rect(boxOriginX + 19, boxOriginY + 90, boxSizeX - 50, 10)
    noStroke()
    fill(5, 93, 169); //labour red

    let perCentPublicScore = (boxSizeX - 50) / (100 / currentPublicScore)
    rect(boxOriginX + 19, boxOriginY + 90, perCentPublicScore, 10)



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

    callFunctionFromDialogue(currentNode.info)
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

//This function calls a function that is referenced in a dialogue node or is called by a response selected by the player
function callFunctionFromDialogue(node) {
    if (node.func != null) {
        if (Array.isArray(node.param)) { //checks to see if param is an array (i.e. multiple parameters)
            node.func(...node.param); //passes each value in array as individual argument
        }
        else {
            node.func(node.param);
        }
    }
}

//--------------------------------//
//FUNCTIONS TO HANDLE RESPONSES

function drawResponse() {

    //Clamps current selection so cannot exceed number of responses
    currentSelection = clamp(currentSelection, 0, currentNode.info.response.length - 1);

    //For Loop to display response options and handle highlighted selected response
    for (let x = 0; x < currentNode.info.response.length; x++) {
        
        let selectionSizeY = 50;
        selectionOriginX = textOriginX - 19;
        selectionOriginY = textOriginY + (x * selectionSizeY) - 32;
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

function endDialogue(nextState) {
    switchState(nextState)
}

function setStartNode(npc, node) {
    npc.startNode = node;
}

//--------------------------------//
//DIALOGUE NODES



