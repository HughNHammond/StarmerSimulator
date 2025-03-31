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

//EVENTS
let streetingDay1 = [];
let reevesDay1 = [];
let economySpeed = [];
let econSpeechResponses = [];

//IMPORTANT STRINGS
let end = "end";
let reporter = "REPORTER"



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


    streetingDay1 = [
        {label: "streeting1", speaker: streeting.name, dialogue: "Good morning Prime Minister. If you want my advice..."},
        {label: "streeting2", speaker: streeting.name, dialogue: "Have you considered being inexpilcably racist?",
            response: [
                {r: "Where's Rachel?", goTo: "reevesTrigger1", func: () => activateNPC(reeves)},
                {r: "Uhhh... thank you Wesley.", goTo: end}
            ]
        },
        {label: "reevesTrigger1", speaker: streeting.name, dialogue: "Look, she's just come in. She's looking....."}
    ]

    reevesDay1 = [
        {label: "reeves1", speaker: reeves.name, dialogue: "..."},
        {label: "reeves2", speaker: reeves.name, dialogue: "..............."},
        {label: "reeves3", speaker: reeves.name, dialogue: ".................................. gggggg"},
        {label: "reeves4", speaker: reeves.name, dialogue: "grrrrrrrrrrwwwwwwwwwwwwooooooooo OOOOOOOTTTTTTTTTTTTTHHHHHHHHHH HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH."}
    ]

    anotherEvent = [
        {label: "anotherEvent", speaker: "Streeting", dialogue: "Let's test if I can say this now!"}
    ]


    econSpeechResponses = [               
        {r: "Address disability cuts.", goTo: "disability1"},
        {r: "Empathsise with the public", goTo: "empathy1"},
        {r: "Propose a small wealth tax", goTo: "wealth1"},
        {r: "Announce policies to fix the NHS", goTo: "NHS1"},
        {r: "Address the housing crisis", goTo: "housing1"},
        {r: "Be inexplicably racist", goTo: "racism"},
        {r: "Pledge to actually address wealth inequality", goTo: "gameOver"}
    ]

    economySpeech = [

        //INTRO
        {label: "intro1", speaker: player.name, dialogue: "Good morning. Nearly a year ago, the British public voted for change."},
        {label: "intro2", speaker: player.name, dialogue: "After 14 years of Conservative ruin, Britain needs bold and radical change, and only the Labour Party can deliver it."},
        {label: "intro3", speaker: player.name, dialogue: "I spoke to a woman this morning who had voted Conservative for nearly three decades."},
        {label: "intro4", speaker: player.name, dialogue: "but she put her trust in the Labour Party in the last election, because she knew this transformed Labour Party shared her values."},
        {label: "intro5", speaker: player.name, dialogue: "We've had to make some tough choices, and they haven't all been popular."},
        {label: "intro6", speaker: player.name, dialogue: "I'm not afraid to make tough choices, to cut what needs cutting, and promote the growth this country so desperately needs.", response: econSpeechResponses},

        //ADDRESS DISABILITY CUTS
        //{label: "Disability1", speaker: player.name, dialogue: ""},
        {label: "disability1", speaker: player.name, dialogue: "Whenever the Conservatives announced cuts to welfare, I welcomed their proposals, but I urged them to go further."},
        {label: "disability2", speaker: player.name, dialogue: "The wreckless spending of the Conservative party means it is up to the Labour Party to get Britain working again."},
        {label: "disability3", speaker: player.name, dialogue: "The welfare system is indefensible, both economically and morally.", func: () => player.modifyPressRating(-5, -7)},
        {label: "disability4", speaker: player.name, dialogue: "Hundreds of thousands people given hand outs without any hope."},
        {label: "disability5", speaker: player.name, dialogue: "We are the Labour Party. Our mission is to deliver hope, and we will do that by getting people back to work."},
        {label: "disability6", speaker: player.name, dialogue: "That is why last week I announced our plans to cut disability spending, saving the public £7 billion."},
        {label: "disability7", speaker: player.name, dialogue: "This has shocked some members of the public, but we will not listen to those who wish to exclude the disabled from economic life."},
        {label: "disability8", speaker: player.name, dialogue: "Why give out benefits when there are the benefits of work? Haw haw haw."},
        {label: "disability9", speaker: player.name, dialogue: "We have partnered with Amazon, who will be delivering the new 'Get up, Get Out' program, helping disabled people find work at Amazon Warehouses."},
        {label: "disability10", speaker: player.name, dialogue: "Last week, I visited an Amazon warehouse and I realised something."},
        {label: "disability11", speaker: player.name, dialogue: "Working in an Amazon Warehouse isn't just gruelling physical labour, it can also be a great form of physio therapy.", func: () => player.modifyPressRating(5, 10)},
        {label: "disability12", speaker: player.name, dialogue: "I saw workers stretch key muscle groups reaching for packages on a high shelf.", func: () => player.modifyPressRating(5, 10)},
        {label: "disability13", speaker: player.name, dialogue: "I saw workers gaining muscle mass rushing around the warehouse at break-necks speeds."},
        {label: "disability14", speaker: player.name, dialogue: "Oh, uh, I thought we cut that line."},
        {label: "disability15", speaker: reporter, dialogue: "Keir Starmer announces his empathetic plan to disabled workers back to work. Say what you like about the man,"},
        {label: "Disability16", speaker: reporter, dialogue: "But this is a sensible and proportional plan that I can't find any fault in.", func: () => player.modifyPressRating(15, 20), response: econSpeechResponses},

        //EMPATHISE WITH PUBLIC
        //{label: "empathy1", speaker: player.name, dialogue: ""}
        {label: "empathy1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        {label: "empathy2", speaker: player.name, dialogue: "So I don't know why you're complaining about it now."},
        {label: "empathy3", speaker: player.name, dialogue: "But I do understand that some people are struggling every day, and I want to tell you:"},
        {label: "empathy4", speaker: player.name, dialogue: "I am right there, struggling with you."},
        {label: "empathy5", speaker: player.name, dialogue: "Last week, my wife and I came to the decision that we would have to make sacrifices in our own food budget."},
        {label: "empathy6", speaker: player.name, dialogue: "The wreckless spending of the Conservative Party means that Waitrose is now simply too expensive for us."},
        {label: "empathy7", speaker: player.name, dialogue: "Instead, we would have been forced to buy food from the Sainsbury's Taste The Difference range.", func: () => player.modifyPressRating(-10, -20)},
        {label: "empathy8", speaker: player.name, dialogue: "Luckily, my son picked up a local paper route and mowed some neighbours lawns so we could keep going to Waitrose."},
        {label: "empathy9", speaker: player.name, dialogue: "Why don't you see if you can get a local paper route, or see if your neighbours need their lawn mowing?"},
        {label: "empathy10", speaker: player.name, dialogue: "If we all did that, we could all go to Waitrose, which I think would be fun."},
        {label: "empathy11", speaker: reporter, dialogue: "Terrifying news from Westminster as PM suggests I do manual labour.", func: () => player.modifyPressRating(-10, -20), response: econSpeechResponses},

        //PROPOSE A SMALL WEALTH TAX
        //{label: "wealth1", speaker: player.name, dialogue: " "},
        {label: "wealth1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        
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
        let prevNode = currentNode;
        currentNode = currentEvent.find((node) => node.label === currentNode.response[currentSelection].goTo);
        currentIndex = currentEvent.indexOf(currentNode);
        if (press) {
            console.log(currentNode);
            prevNode.response.splice(currentSelection, 1);
            console.log(prevNode);
        }
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
        drawResponseText(boxOriginX, boxOriginY,  boxSizeX, boxSizeY, textOriginX, textOriginY, cornerRadius)
    }



}

function displayRatings(boxOriginX, boxSizeX, cornerRadius) {
    let perfBoxOriginX = boxOriginX + tileSize;
    let perfBoxOriginY = (tileSize * 7.5 + 10);
    let perfBoxSizeY = tileSize * 1.5;

    rect(perfBoxOriginX, perfBoxOriginY, boxSizeX - (tileSize * 2), perfBoxSizeY, cornerRadius);

    let pressRating = (tileSize * 3.7) * (player.pressRating / 100);
    let publicRating = (tileSize * 3.7) * (player.publicRating / 100);

    let barOriginX = perfBoxOriginX + tileSize * 2.8;
    let barSizeX = tileSize * 3.7;

    strokeWeight(2),
    stroke(255)
    fill (0),
    rect(barOriginX, perfBoxOriginY + 20, barSizeX, 18);
    rect(barOriginX, perfBoxOriginY + 50, barSizeX, 18);

    noStroke();
    fill(5, 93, 169);
    rect(barOriginX + 1, perfBoxOriginY + 21, pressRating, 16);
    rect(barOriginX + 1, perfBoxOriginY + 51, publicRating, 16);




    noStroke();
    fill(255, 255, 255);
    textAlign(RIGHT);
    textSize(18);
    text("PRESS RATING:  ", perfBoxOriginX + tileSize * 2.8, perfBoxOriginY + 35);
    text("PUBLIC RATING:  ", perfBoxOriginX + tileSize * 2.8, perfBoxOriginY + 65);
    textAlign(LEFT);
    text(player.pressRating + "%", perfBoxOriginX + tileSize * 3.2 + tileSize*3.5, perfBoxOriginY + 35);
    text(player.publicRating + "%", perfBoxOriginX + tileSize * 3.2 + tileSize*3.5, perfBoxOriginY + 65);
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

function drawResponseText(boxOriginX, boxOriginY, boxSizeX, boxSizeY, textOriginX, textOriginY, cornerRadius) {

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
            image(downArrow, boxOriginX + boxSizeX - 60, boxOriginY + 200, 50, 50);
        }
    }
    else {
        page = 1;
        cursorPosition = currentSelection - 4;
        image(upArrow, boxOriginX + boxSizeX - 60, boxOriginY + 50, 50, 50);
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

        let num;
        if (page === 0) num = x;
        else num = x + 4;

        //fill(255, 255, 255) //TEMP FILL
        textSize(20)
        textStyle("bold")
        textAlign(LEFT)
        strokeWeight(0)
        stroke("black");
        text(num + 1 + ". " + options[page][x].r, textOriginX, textOriginY + (x * selectionSizeY))
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
