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
let press;
let allowEndSpeech = false;

//EVENTS
let mcsweeneyCall1 = [];
let streetingDay1 = [];
let reevesDay1 = [];
let kendallDay1 = [];
let economySpeech = [];
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

    mcsweeneyCall1 = [
        {label: "mcsweeney1", speaker: "PHONE", dialogue: "*ring ring, ring ring*"},
        {label: "mcsweeney2", speaker: "PHONE", dialogue: "Morgan McSweeney is calling you...", style: ITALIC,
            response: [
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
                {r: "Answer the phone.", goTo: "mcsweeney3"},
            ]
        },
        {label: "mcsweeney3", speaker: mcsweeney.name, dialogue: "Good Morning, Keir."},
        {label: "mcsweeney4", speaker: mcsweeney.name, dialogue: "We've had a rough landing, but today that all changes."},
        {label: "mcsweeney5", speaker: mcsweeney.name, dialogue: "It's time for a re-launch."},
        {label: "mcsweeney6", speaker: mcsweeney.name, dialogue: "Again."},
        {label: "mcsweeney7", speaker: mcsweeney.name, dialogue: "We have to show the public we're the party that can fix Britain, that has their interests at heart."},
        {label: "mcsweeney8", speaker: mcsweeney.name, dialogue: "And that all starts with the press."},
        {label: "mcsweeney9", speaker: mcsweeney.name, dialogue: "Speak to your advisors and figure out what you're going to say today."},
        {label: "mcsweeney10", speaker: mcsweeney.name, dialogue: "Remember: we have to show the public that we're serious, sensible and can make tough decisions."},
        {label: "mcsweeney11", speaker: mcsweeney.name, dialogue: "Liz's new scheme will help see of this nonsense about us hating disabled people."},
        {label: "mcsweeney12", speaker: mcsweeney.name, dialogue: "And the NHS plans have to be announced."},
        {label: "mcsweeney13", speaker: mcsweeney.name, dialogue: "If things get dicey, take Wes's advice."},
        {label: "mcsweeney14", speaker: mcsweeney.name, dialogue: "I'll be watching."},
        {label: "mcsweeney15", speaker: mcsweeney.name, dialogue: "SO DON'T FUCK IT UP.",
            response: [
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
                {r: "I won't, sir.", goTo: "mcsweeney16"},
            ]
        },
        {label: "mcsweeney16", speaker: mcsweeney.name, dialogue: "Good boy. When you're ready, head outside and press SPACE BAR at the podium."},
    ]

    streetingDay1 = [
        {label: "streeting1", speaker: streeting.name, dialogue: "Good morning Prime Minister. If you want my advice..."},
        {label: "streeting2", speaker: streeting.name, dialogue: "My new NHS plan will really help with this re-launch."},
        {label: "streeting3", speaker: streeting.name, dialogue: "But you know how dumb the public can be."},
        {label: "streeting4", speaker: streeting.name, dialogue: "If that doesn't work..."},
        {label: "streeting5", speaker: streeting.name, dialogue: "Have you considered being inexplicably transphobic?",
            response: [
                {r: "I was thinking about being racist instead.", goTo: "streeting6"},
                {r: "Uhhh... thank you Wesley.", goTo: end}
            ]
        },
        {label: "streeting6", speaker: streeting.name, dialogue: "You make me proud to be a member of this party."}
    ]

    reevesDay1 = [
        {label: "reeves1", speaker: reeves.name, dialogue: "..."},
        {label: "reeves2", speaker: reeves.name, dialogue: "..............."},
        {label: "reeves3", speaker: reeves.name, dialogue: ".................................. gggggg"},
        {label: "reeves4", speaker: reeves.name, dialogue: "ggggggrrrrrrrrrrwwwwwwwwwwooooooo OOOOOOOTTTTTTTTTTTTTHHHHHHHHHH HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH."}
    ]

    kendallDay1 = [
        {label: "kendall1", speaker: kendall.name, dialogue: "My new 'Get Up, Get Out' scheme will fix everything!"},
        {label: "kendall2", speaker: kendall.name, dialogue: "You must announce it today!"},
    ]

    econSpeechResponses = [               
        {r: "Announce the 'Get Up, Get Out' scheme.", goTo: "disability1"},
        {r: "Empathise with the public", goTo: "empathy1"},
        {r: "Propose a small wealth tax", goTo: "wealth1"},
        {r: "Announce policies to fix the NHS", goTo: "NHS1"},
        {r: "Address the housing crisis", goTo: "housing1"},
        {r: "Be inexplicably racist", goTo: "racism"},
        {r: "Pledge to actually address wealth inequality", goTo: "left1"}
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
        {label: "disability15", speaker: player.name, dialogue: "I saw workers developing their fine motor skills by peeing in bottles instead of wasting time on toilet breaks."},
        {label: "disability16", speaker: player.name, dialogue: "I used to pee in bottles, but my wife doesn't let me anymore."},
        {label: "disability17", speaker: player.name, dialogue: "But that doesn't mean disabled people can't pee in bottles, and it is the Labour Party who has the courage to let them."},
        {label: "Disability18", speaker: reporter, dialogue: "Well, that clears up any moral issues for me!", func: () => player.modifyPressRating(15, 20), response: econSpeechResponses},

        //EMPATHISE WITH PUBLIC
        //{label: "empathy1", speaker: player.name, dialogue: ""}
        {label: "empathy1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        {label: "empathy2", speaker: player.name, dialogue: "So I don't know why you're complaining about it now."},
        {label: "empathy3", speaker: player.name, dialogue: "But I do understand that some people are struggling every day, and I want to tell you:"},
        {label: "empathy4", speaker: player.name, dialogue: "I am right there, struggling with you."},
        {label: "empathy5", speaker: player.name, dialogue: "Last week, my wife and I came to the decision that we would have to make sacrifices in our own food budget."},
        {label: "empathy6", speaker: player.name, dialogue: "The wreckless spending of the Conservative Party means that Waitrose is now simply too expensive for us."},
        {label: "empathy7", speaker: player.name, dialogue: "Instead, we would have been forced to buy food from the Sainsbury's Taste The Difference range.", func: () => player.modifyPressRating(-5, -10)},
        {label: "empathy8", speaker: player.name, dialogue: "Luckily, my son picked up a local paper route and mowed some neighbours lawns so we could keep going to Waitrose."},
        {label: "empathy9", speaker: player.name, dialogue: "Why don't you see if you can get a local paper route, or see if your neighbours need their lawn mowing?"},
        {label: "empathy10", speaker: player.name, dialogue: "If we all did that, we could all go to Waitrose, which I think would be fun."},
        {label: "empathy11", speaker: reporter, dialogue: "Terrifying news from Westminster as PM suggests I do manual labour.", func: () => player.modifyPressRating(-5, -10), response: econSpeechResponses},

        //PROPOSE A SMALL WEALTH TAX
        //{label: "wealth1", speaker: player.name, dialogue: " "},
        {label: "wealth1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        {label: "wealth2", speaker: player.name, dialogue: "Everyone has to pitch in. That means we will be propsing a small wealth tax."},
        {label: "wealth3", speaker: player.name, dialogue: "Those in the highest tax bracket will have their tax rate increased by 0.00001%.", func: () => player.modifyPressRating(-20, -20)},
        {label: "wealth4", speaker: reporter, dialogue: "Mr Prime Minister! This just in from Laura Kuenssberg: apparently every millionaire is now leaving the country, including Laura Kuenssberg!"},
        {label: "wealth5", speaker: player.name, dialogue: "Oh uhhhh, forget that, we're not doing that. That was just me being my usual funny self!"},
        {label: "wealth6", speaker: player.name, dialogue: "Haw haw haw."},
        {label: "wealth7", speaker: player.name, dialogue: "Growth.", func: () => player.modifyPressRating(15, 20), response: econSpeechResponses},

        //FIX THE NHS
        //{label: "NHS1", speaker: player.name, dialogue: " "},
        {label: "NHS1", speaker: player.name, dialogue: "Britain led the way in technology. It was a Scotsman who invented the telephone. An Englishman invented the World Wide Web."},
        {label: "NHS2", speaker: player.name, dialogue: "And the Welsh are also here."},
        {label: "NHS3", speaker: reporter, dialogue: "What's a Welsh?", func: () => player.modifyPressRating(-2, -5)},
        {label: "NHS4", speaker: player.name, dialogue: "The Labour Party will invest funds into AI to ensure that British ingenuity is at the forefront of our global technological future."},
        {label: "NHS5", speaker: player.name, dialogue: "From today, instead of relying on Doctors, the British public can simply ask a chatbot what to do in a medical emergency."},
        {label: "NHS6", speaker: player.name, dialogue: "The technology will allow patients to write in their symptoms, and then it will create a user-directed treatment plan."},
        {label: "NHS7", speaker: player.name, dialogue: "Trials have shown this technology works with 32% accuracy, an astonishing result."},
        {label: "NHS8", speaker: player.name, dialogue: "Where possible, it will help patients look after themselves from home."},
        {label: "NHS9", speaker: player.name, dialogue: "The program can help you create simple remedies from household items like honey and bleach,"},
        {label: "NHS10", speaker: player.name, dialogue: "to directing patients to their nearest funeral parlour so they can arrive prompty upon their death."},
        {label: "NHS11", speaker: player.name, dialogue: "It will even give you instructions on how to perform life-saving surgeries on to perform life-saving surgeries on yourself."},
        {label: "NHS1", speaker: player.name, dialogue: "The possibilities are amazing. All that money wasted on surgeons and nurses, back in the British Public's hands.", func: () => player.modifyPressRating(10, 15), response: econSpeechResponses},
        
        //ADDRESS HOUSING CRISIS
        //{label: "housing1", speaker: player.name, dialogue: " "},
        {label: "housing1", speaker: player.name, dialogue: "We pledged to get Britain building again. We would make a country of builders, not blockers."},
        {label: "housing2", speaker: player.name, dialogue: "I told the British public that I would take on the NIMBYs to get shovels in the ground and cranes in the sky."},
        {label: "housing3", speaker: player.name, dialogue: "But woke left NIMBYs are already looking at our planning bill and asking questions like:", func: () => player.modifyPressRating(5, 10)},
        {label: "housing4", speaker: player.name, dialogue: '"Why would private housing companies deliberately devalue their assets by building more houses?"'},
        {label: "housing5", speaker: player.name, dialogue: 'My answer to this is "because construction CEOs are actually very nice people".'},
        {label: "housing6", speaker: player.name, dialogue: "One bought me this suit. It's very nice."},
        {label: "housing7", speaker: player.name, dialogue: "I can ask him if he'll get you one if you like."},
        {label: "housing8", speaker: reporter, dialogue: "He's talking about my Dad <3", func: () => player.modifyPressRating(10, 15)},
        {label: "housing8", speaker: "OTHER REPORTERS", dialogue: "Awwwwww...", response: econSpeechResponses},

        //BE INEXPLICABLY RACIST
        {label: "racism", speaker: player.name, dialogue: "[Author's Note: I ain't writing this.]", func: () => player.modifyPressRating(100, 100), response: econSpeechResponses},

        //ADRDRESS WEALTH INEQUALITY
        {label: "left1", speaker: player.name, dialogue: "This is... None of this will work. We need to actually improve peoples lives, address the injustices of an ecoonomy built on the exploitation of labour...", func: () => endGame(kicked)},

        //End Speech
        {label: "end1", speaker: player.name, dialogue: "Sacrifices must be made, but it is necessary to build Britain back bett- I mean to get Britain's future back, together.", func: () => setPressCompletedToTrue()},
    ]
}

//------------------------SPECIFIC DIALOGUE FUNCTIONS--------------------------//

function handleEndSpeechChoice() {
    if (!allowEndSpeech) {
        econSpeechResponses[econSpeechResponses.length] = {r: "[END SPEECH]", goTo: "end1"};
        allowEndSpeech = true;
    }
}

//-----------------FUNCTIONS FOR GENERAL DIALOGUE UPDATING---------------------//

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
    
    if (player.pressRating <= 0) {
        endGame(lose);
        switchState(transition);
        return;
    }

    if (gameState === transition) return;

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

    if (press) handleEndSpeechChoice();
    
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
        fill(228, 0, 59); //labour red;

    
    

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
    
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red;

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
    textStyle(BOLD);
    text(currentNode.speaker, textOriginX, textOriginY, boxSizeX - (boxTextPadding * 1.5), boxSizeY - boxTextPadding);
    
    if (currentNode.style != undefined) textStyle(currentNode.style)
    else textStyle(NORMAL);
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

    textFont(dialogueFont) //Sets font for dialogue
    drawDialogueBox();
}


//-----------------------ONE TIME FUNCTIONS--------------------//

function setPressCompletedToTrue() {
    pressCompleted = true;
}