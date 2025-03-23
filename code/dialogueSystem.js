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
let currentSelection = 0;

let exampleEvent = [];
let anotherEvent = [];
let exampleResponse = [];
let end = "end";

function createDialogueEvents() {

    /*  NOTE ON HOW DIALOGUE EVENTS WORK
        Each Dialogue Event is an Array containing several NODES. Each node is an object.

        REUQIRED PROPERTIES
        label: a string containing a label/name for the node
        speaker: a string with the name of the NPC stating the dialogue
        dialogue: a string containing the dialogue for that node

        OPTIONAL PROPERTIES
        GoTo: A string that matches the label of the node to be displayed next
        func: write '() =>' then the name of the function + any parameters in brackets. '() =>' delays calling the function 
        until node.func() is called in my script (under updateDialogue!). If i just wrote e.g. 'func: activateNPC(reeves)' then
        it would be called when the code starts and the object is created, not when called in my script.
    */

    exampleEvent = [
        {label: "intro1", speaker: streeting.name, dialogue: "Hello, this is  my intro Dialogue"},
        {label: "intro2", speaker: streeting.name, dialogue: "Here is some more dialogue", goTo: "intro4", func: () => activateNPC(reeves)},
        {label: "intro3", speaker: streeting.name, dialogue: "This dialogue should be skipped"},
        {label: "intro4", speaker: streeting.name, dialogue: "I skipped a node. Would you like me to say something else?",
            response: [
                {r: "God no, shuttup Wesley.", goTo: end},
                {r: "Yes please, I hate myself.", goTo: "intro5", func: () => setStartNode(streeting, anotherEvent)}
            ]
        },
        {label: "intro5", speaker: streeting.name, dialogue: "If you talk to me again, I'll say something new!", goTo: end}
    ]

    exampleResponse = [
        {label: "respond1", speaker: mcsweeney.name, dialogue: "You can choose some options now.", 
            response: [
                {r: "Here is one response.", goTo: "respond2"},
                {r: "This is a second response.", goTo: "respond3"},
                {r: "This ends dialogue.", goTo: end},
                {r: "This is the first response again.", goTo: "respond2"},
                {r: "This is the second response again", goTo: "respond3"}
            ]
        },
        {label: "respond2", speaker: mcsweeney.name, dialogue: "You picked the first option.", goTo: end},
        {label: "respond3", speaker: mcsweeney.name, dialogue: "You picked the second option.", goTo: end}
    ]

    anotherEvent = [
        {label: "anotherEvent", speaker: "Streeting", dialogue: "Let's test if I can say this now!"}
    ]
}


//-----------------------UPDATE DIALOGUE FUNCTIONS-----------------------------//

//HANDLE DIALOGUE NODES – Called when player clicks to change current dialogue
function updateDialogue() {

    if (gameState === dialogue) {
        updateFromDialogueNode();
    }
    
    else if (gameState === respond) {
        updateFromResponseNode();
    }

}

function updateFromDialogueNode() { //Checks if node has any code to run and checks what node to load next
    //Checks if dialogue has function inside it
    if (currentNode.func != undefined) currentNode.func();
    

    if (currentNode.response != undefined) {
        currentSelection = 0;
        switchState(respond);
        return;
    }
    else if (gameState != dialogue) {
        switchState(dialogue);
        return;
    }

    //GO TO NEXT DIALOGUE IF NO GOTO INSTRUCTIONS
    if (currentNode.goTo === undefined || currentNode.goTo === end) {
        if (currentIndex >= currentEvent.length - 1 || currentNode.goTo === end) {
            endDialogue(walk);
        } else {
            currentIndex++;
            currentNode = currentEvent[currentIndex];
        }
    }
    else {
        currentNode = currentEvent.find((node) => node.label === currentNode.goTo);
        currentIndex = currentEvent.indexOf(currentNode);
    }
}

function updateFromResponseNode() {
    if (currentNode.response[currentSelection].func != undefined) { currentNode.response[currentSelection].func(); };

    //... END DIALOGUE IF NO NEXT NODE
    if (currentNode.response[currentSelection].goTo === undefined || currentNode.response[currentSelection].goTo === end) {
        switchState(walk);
        return;
    }

    //... OR MOVE TO NEXT NODE
    else {
        currentNode = currentEvent.find((node) => node.label === currentNode.response[currentSelection].goTo);
        currentIndex = currentEvent.indexOf(currentNode);
        switchState(dialogue);
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


//--------------------------------------DRAWING BOX/TEXT---------------------------------------//

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
        boxOriginY = -30; 
        textOriginY = boxOriginY + boxTextPadding + 28;
    }


    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red

    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius);

    if (press) {
        displayRatings(boxOriginX, boxSizeX, cornerRadius);
    }

    if (gameState === dialogue) {
        drawDialogueText(boxSizeX, boxSizeY, textOriginX, textOriginY, boxTextPadding);
    }
    else if (gameState === respond) {
        drawResponseText(boxOriginX,  boxSizeX, boxSizeY, textOriginX, textOriginY, cornerRadius)
    }



}

function displayRatings(boxOriginX, boxSizeX, cornerRadius) {
    let perfBoxOriginX = boxOriginX + tileSize;
    let perfBoxOriginY = (tileSize * 7.5 + 10);
    let perfBoxSizeY = tileSize * 1.5;

    rect(perfBoxOriginX, perfBoxOriginY, boxSizeX - (tileSize * 2), perfBoxSizeY, cornerRadius);

    let pressRating = (tileSize * 3.5) * (player.pressRating / 100);
    let publicRating = (tileSize * 3.5) * (player.publicRating / 100);

    fill(5, 93, 169);
    rect(perfBoxOriginX + tileSize * 2.8, perfBoxOriginY + 21, pressRating, 18, cornerRadius);
    rect(perfBoxOriginX + tileSize * 2.8, perfBoxOriginY + 51, publicRating, 18, cornerRadius);


    noStroke();
    fill(255, 255, 255);
    textAlign(RIGHT);
    textSize(18);
    text("PRESS RATING:  ", perfBoxOriginX + tileSize * 2.7, perfBoxOriginY + 35);
    text("PUBLIC RATING:  ", perfBoxOriginX + tileSize * 2.7, perfBoxOriginY + 65);
    textAlign(LEFT);
    text(player.pressRating + "%", perfBoxOriginX + tileSize * 3.0 + pressRating, perfBoxOriginY + 35);
    text(player.publicRating + "%", perfBoxOriginX + tileSize * 3.0 + publicRating, perfBoxOriginY + 65);
}

function drawDialogueText(boxSizeX, boxSizeY, textOriginX, textOriginY, boxTextPadding) {

    //DRAW TEXT
    textSize(25);
    strokeWeight(0);
    stroke(255, 131, 131);
    fill(255, 255, 255);
    textAlign(LEFT);
    textStyle("bold");
    text(currentNode.speaker, textOriginX, textOriginY, boxSizeX - (boxTextPadding * 1.5), boxSizeY - boxTextPadding);
    textStyle("normal");
    text(currentNode.dialogue, textOriginX, textOriginY + 40, boxSizeX - (boxTextPadding * 1.5), boxSizeY - boxTextPadding);
}

function drawResponseText(boxOriginX, boxSizeX, boxSizeY, textOriginX, textOriginY, cornerRadius) {

    //Clamps current selection so cannot exceed number of responses
    currentSelection = clamp(currentSelection, 0, currentNode.response.length - 1);

    //Checks how many options there are. If more than 4, it splits them into two arrays.
    let options = []; 
    if (currentNode.response.length <= 4) {
        options = [currentNode.response];
    }
    else {
        options = [currentNode.response.slice(0,4), currentNode.response.slice(4)];
    }

    //Checks what option is currently selected and determines which page of options should be rendered on screen
    let cursorPosition;
    let page;
    if (currentSelection <= 3) {
        page = 0;
        cursorPosition = currentSelection;
        if (options.length > 1) {
            image(downArrow, boxOriginX + boxSizeX - 60, height - 50, 50, 50);
        }
    }
    else {
        page = 1;
        cursorPosition = currentSelection - 4;
        image(upArrow, boxOriginX + boxSizeX - 60, height - boxSizeY + 60, 50, 50);
    }

    //Runs a for loop to draw the text on screen for each option and highlight the relevant option
    for (let x = 0; x < options[page].length; x++) {
        let selectionSizeY = 50;
        let selectionOriginX = textOriginX - 19;
        let selectionOriginY = textOriginY + (x * selectionSizeY) - 32;
        let selectionSizeX = boxSizeX - (tileSize*1.5);
        
        noStroke();

        if (cursorPosition === x) {
            //For selected option
            fill(255, 255, 255);
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(0, 0, 0);
        } else {
            //For non-selected options
            noFill();
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(255, 255, 255);
        }

        //fill(255, 255, 255) //TEMP FILL
        textSize(20)
        textStyle("bold")
        textAlign(LEFT)
        strokeWeight(0)
        stroke("black");
        text(x + 1 + ". " + options[page][x].r, textOriginX, textOriginY + (x * selectionSizeY))
    }


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
