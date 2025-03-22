/*
HOW THIS WILL WORK

Each character and object has a dialogue node associated with it. In controls.js, there is the script to trigger
the dialogueSystem, which is written here.

Each dialogue event will be a 
*/


//MODEL DIALOGUE NODE

//INITIALISE VARIABLES
let currentEvent;
let currentNode;
let currentIndex;

let exampleEvent = [];
let anotherEvent = [];

function createDialogueEvents() {

    /*  NOTE ON HOW DIALOGUE EVENTS WORK
        All nodes need a LABEL, a SPEAKER, and a DIALOGUE value.

        OPTIONAL
        GoTo: Set to the label of the node you wish to jump to.
        func: write '() =>' then the name of the function + any parameters in brackets. '() =>' delays calling the function 
        until node.func() is called in my script (under updateDialogue!)
    */

    exampleEvent = [
        {label: "intro1", speaker: "Starmer", dialogue: "Hello, this is  my intro Dialogue"},
        {label: "intro2", speaker: "Starmer", dialogue: "Here is some more dialogue", goTo: "intro4", func: () => activateNPC(reeves)},
        {label: "intro3", speaker: "Starmer", dialogue: "This dialogue should be skipped"},
        {label: "intro4", speaker: "Starmer", dialogue: "I skipped a node", func: () => setStartNode(streeting, anotherEvent)}
    ]

    anotherEvent = [
        {label: "anotherEvent", speaker: "Streeting", dialogue: "Let's test if I can say this now!"}
    ]
}

//HANDLE DIALOGUE NODES – Called when player clicks to change current dialogue
function updateDialogue() {
    //Checks if dialogue has function inside it
    if (currentNode.func != undefined) {
        currentNode.func();
    }
    
    //GO TO NEXT DIALOGUE IF NO GOTO INSTRUCTIONS
    if (currentNode.goTo === undefined) { 
        if (currentIndex >= currentEvent.length - 1) {
            endDialogue(walk)
        } else {
            currentIndex++;
            currentNode = currentEvent[currentIndex];
        }
    } else {
        currentNode = currentEvent.find((node) => node.label === currentNode.goTo);
        currentIndex = currentEvent.indexOf(currentNode);
    }
}

function startDialogue(npc) {
    currentEvent = npc.startNode;
    currentIndex = 0;
    currentNode = npc.startNode[currentIndex]; //Gets the index of the start Node for NPC and sets it to the currentNode

}

function endDialogue(nextState) {
    switchState(nextState)
}

//DRAWING DIALOGUE BOX
function drawDialogueBox() {

    //BOX VARIABLES
    let boxOriginX = (tileSize*tilesX)*0.05;
    let boxSizeX =  (tileSize*tilesX)*0.9;
    let boxSizeY = (tileSize * tilesX)*0.4;
    let boxOriginY; //this is the only vary that values!
    let cornerRadius = 30; 

    //TEXT POSITION VARIABLES
    let boxTextPadding = 50;
    let textOriginX = boxOriginX + boxTextPadding; //sets origin of text for response
    let textOriginY


    //This checks if box should be drawn above or below the player based on position
    if (player.yPos <= (tilesY/2) * tileSize) { //Check if player is on the lower half of the screen
        //BOX DRAWN ABOVE
        boxOriginY = height*0.6;
        textOriginY = boxOriginY + boxTextPadding; 
    }
    else { //if on upper half of screen
        //BOX DRAWN BELOW
        boxOriginY = -40; 
        textOriginY = boxOriginY + boxTextPadding - 18;
    }

    //DRAW BOX
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red
    
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
    
    //DRAW TEXT
    textSize(25)
    strokeWeight(0)
    stroke(255, 131, 131);
    fill(255,255,255);
    textAlign(LEFT)
    textStyle("bold")
    text(currentNode.speaker, textOriginX, textOriginY, boxSizeX - (boxTextPadding*1.5), boxSizeY - boxTextPadding)
    textStyle("normal")
    text(currentNode.dialogue, textOriginX, textOriginY + 40, boxSizeX - (boxTextPadding*1.5), boxSizeY - boxTextPadding);
}

//Draw Loop
function dialogueDraw() { //draw function for dialogue
    drawDialogueBox();

    textFont(dialogueFont) //Sets font for dialogue

    // //CODE TO CHECK HOW TO DRAW TEXT
    // if (gameState === dialogue) {
    //     drawText(); //Draw NPC dialogue
    // }
    // else if (gameState === respond) {
    //     drawResponse(); //Create dialogue selection menu
    // }

    // if (press) {
    //     drawPerformanceBox()
    // }
}
