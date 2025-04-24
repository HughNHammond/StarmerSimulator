//INITIALISE VARIABLES
let currentEvent;
let currentNode;
let currentIndex;
let currentSelection = 0;
let press;
let allowEndSpeech = false; //Bespoke variable that turns true when player has selected at least one response during dialogue event, allowing them to end the speech.

//EVENTS
let mcsweeneyCall1 = [];
let streetingDay1 = [];
let reevesDay1 = [];
let kendallDay1 = [];
let economySpeech = [];
let econSpeechResponses = [];

//IMPORTANT STRINGS
let end = "end"; //if a dialogue node includes 'goTo: end', dialogue ends.
let reporter = "REPORTER" //Used as a speaker name during some dialogue nodes when there is no NPC object
let otherReporters = "OTHER REPORTERS"; //Used as a speaker name during some dialogue nodes when there is no NPC object

function createDialogueEvents() {

    /*  NOTE ON HOW DIALOGUE EVENTS WORK
        Each Dialogue Event is an Array containing several NODES. Each node is an object.

        REUQIRED PROPERTIES
        label: a string containing a label/name for the node
        speaker: a string with the name of the NPC stating the dialogue
        dialogue: a string containing the dialogue for that node

        OPTIONAL PROPERTIES
        goTo: A string that matches the label of the node to be displayed next
        func: write '() =>' then the name of the function + any parameters in brackets. '() =>' delays calling the function until node.func() is called in my script 
        (under updateDialogue!). If i just wrote e.g. 'func: endGame(kicked)' then it would be called when the the object is first created in setup(), not when 
        the dialogue is displayed!
        response: an array containing further objects (see below)

        RESPONSE NODES:
        Some dialogue nodes contain an array with several RESPONSE NODES inside them. Response nodes REQUIRE the following PROPERTIES:
        r: a string describing the response
        goTo: which dialogue node the system should load next

        And my OPTIONALLY include the following PROPERTEIS:
        func: can load funcs from responses as described above

        EXAMPLE NODE:
        {label: "Name Node Here", speaker: "String for speaker", dialogue: "Write some dialogue to display on screen here", func: () => myFunction(), 
            response: [
                {r: "The player's first dialogue option", goTo: "label of node to load next"}
                {r: "The player's second dialogue option", goTo: "label of node to load next"}
            ]
        }
    */


    //CALL WHEN PLAYER STARTS GAME
    mcsweeneyCall1 = [
        {label: "mcsweeney1", speaker: "PHONE", dialogue: "*ring ring, ring ring*"},
        {label: "mcsweeney2", speaker: "PHONE", dialogue: "Morgan McSweeney is calling you...",
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
        {label: "mcsweeney3", speaker: mcsweeney.name, dialogue: "Why did I have to wait until the third ring, Keir?"},
        {label: "mcsweeney4", speaker: mcsweeney.name, dialogue: "Don't answer that. I don't have time for you today. Today is too important."},
        {label: "mcsweeney5", speaker: mcsweeney.name, dialogue: "You know what day it is. It's speech day."},
        {label: "mcsweeney6", speaker: mcsweeney.name, dialogue: "And to solve our dismal polling, we need a whopper of a speech from you."},
        {label: "mcsweeney6", speaker: mcsweeney.name, dialogue: "Our focus groups of people who had 'legitimate concerns' in July/August last year tell us that they think you're boring and too left wing."},
        {label: "mcsweeney7", speaker: mcsweeney.name, dialogue: "..."},
        {label: "mcsweeney8", speaker: mcsweeney.name, dialogue: "You better not be crying again, Keir."},
        {label: "mcsweeney10", speaker: mcsweeney.name, dialogue: "We have to get the press back on board. They'll tell the public all they need to know about us."},
        {label: "mcsweeney11", speaker: mcsweeney.name, dialogue: "But there's been a fuck-up Keir. Our team was so busy reminding people you're not Jeremy Corbyn..."},
        {label: "mcsweeney12", speaker: mcsweeney.name, dialogue: "We forgot to actually write your speech."},
        {label: "mcsweeney13", speaker: mcsweeney.name, dialogue: "Oh stop crying Keir. You're going to be fine."},
        {label: "mcsweeney14", speaker: mcsweeney.name, dialogue: "You are going to be fine. Because if not..."},
        {label: "mcsweeney15", speaker: mcsweeney.name, dialogue: "Well, let's not think about that."},
        {label: "mcsweeney16", speaker: mcsweeney.name, dialogue: "Talk to your advisors, they'll tell you what you should talk about today."},
        {label: "mcsweeney17", speaker: mcsweeney.name, dialogue: "When you're ready and done, head outside, and go up to the podium to start your speech."},
        {label: "mcsweeney18", speaker: mcsweeney.name, dialogue: "I'm going to be watching very closely Keir."},
        {label: "mcsweeney19", speaker: mcsweeney.name, dialogue: "And I won't be happy if I don't see that press rating go up."},
        {label: "mcsweeney20", speaker: mcsweeney.name, dialogue: "So..."},
        {label: "mcsweeney21", speaker: mcsweeney.name, dialogue: "DON'T"},
        {label: "mcsweeney22", speaker: mcsweeney.name, dialogue: "DON'T\nFUCK"},
        {label: "mcsweeney23", speaker: mcsweeney.name, dialogue: "DON'T\nFUCK\nIT"},
        {label: "mcsweeney24", speaker: mcsweeney.name, dialogue: "DON'T\nFUCK\nIT\nUP!",
            response: [
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
                {r: "I won't, sir.", goTo: "endMcSweeney"},
            ]
        },
        {label: "endMcSweeney", speaker: mcsweeney.name, dialogue: "Good boy. Now off you go."},
    ]


    //DIALOGUE WITH NPCS IN LEVEL 1
    streetingDay1 = [
        {label: "streeting1", speaker: streeting.name, dialogue: "Good morning Prime Minister. If you want my advice..."},
        {label: "streeting2", speaker: streeting.name, dialogue: "Tax rises don't play well with the press, so we can't do that."},
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
        {label: "reeves3", speaker: reeves.name, dialogue: ".................................. "},
        {label: "reeves4", speaker: reeves.name, dialogue: "gggggrrrrrrrooooooooooooooooooooooooo\nwwwwwwwtttttttttttttthhhhhhhhhhh."}
    ]

    kendallDay1 = [
        {label: "kendall1", speaker: kendall.name, dialogue: "While *I* think you should go out there an execute a starving child live on camera, McSweeney says we can't do that anymore."},
        {label: "kendall1", speaker: kendall.name, dialogue: "He's way too concerned with image if you ask me."},
        {label: "kendall2", speaker: kendall.name, dialogue: "Anyway, the 'Get Up, Get Out' scheme will help with our image after the press briefly decided it cared about disabled people."},
        {label: "kendall3", speaker: kendall.name, dialogue: "That'll get some good play I reckon."},
    ]

    //PLAYER RESPONSES DURING SPEECH
    econSpeechResponses = [               
        {r: "Announce the 'Get Up, Get Out' scheme.", goTo: "disability1"},
        {r: "Empathise with the public", goTo: "empathy1"},
        {r: "Propose a small wealth tax", goTo: "wealth1"},
        {r: "Announce policies to fix the NHS", goTo: "NHS1"},
        {r: "Address the housing crisis", goTo: "housing1"},
        {r: 'Scream "GROWTH"', goTo: "growth1"},
        {r: "Be inexplicably racist", goTo: "racism"},
        {r: "Pledge to address material issues", goTo: "left1"}
    ]

    //SPECEH DIALOGUE
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
        {label: "disability4", speaker: player.name, dialogue: "Hundreds of thousands people given hand outs without hope."},
        {label: "disability5", speaker: player.name, dialogue: "We are the Labour Party. Our mission is to deliver hope, and we will do that by getting people back to work."},
        {label: "disability6", speaker: player.name, dialogue: "That is why last week I announced our plans to cut disability spending, saving the public £7 billion."},
        {label: "disability7", speaker: player.name, dialogue: "This has shocked some members of the public, but we will not listen to those who wish to exclude the disabled from economic life."},
        {label: "disability8", speaker: player.name, dialogue: "Why give out benefits when there are the benefits of work?"},
        {label: "disability9", speaker: player.name, dialogue: "We have partnered with Amazon, who will be delivering the new 'Get up, Get Out' program, helping disabled people find work at Amazon Warehouses."},
        {label: "disability10", speaker: player.name, dialogue: "Last week, I visited an Amazon Fulfilment Centre and I realised something."},
        {label: "disability11", speaker: player.name, dialogue: "Working in an Amazon Warehouse isn't just gruelling physical labour, it can also be a great form of physio therapy.", func: () => player.modifyPressRating(5, 10)},
        {label: "disability12", speaker: player.name, dialogue: "I saw workers stretch key muscle groups reaching for packages on a high shelf.", func: () => player.modifyPressRating(5, 10)},
        {label: "disability13", speaker: player.name, dialogue: "I saw workers gaining muscle mass rushing around the warehouse at break-necks speeds."},
        {label: "disability14", speaker: player.name, dialogue: "Oh, uh, I didn't say break-neck, I said proportional speeds."},
        {label: "disability15", speaker: player.name, dialogue: "I saw workers developing their fine motor skills by peeing in bottles instead of wasting time on toilet breaks."},
        {label: "disability16", speaker: player.name, dialogue: "I used to pee in bottles, but my wife doesn't let me anymore."},
        {label: "disability17", speaker: player.name, dialogue: "But that doesn't mean disabled people can't pee in bottles, and it is the Labour Party who has the courage to let them."},
        {label: "Disability18", speaker: reporter, dialogue: "Well, that clears up any moral issues for me!", func: () => player.modifyPressRating(5, 10), response: econSpeechResponses},

        //EMPATHISE WITH PUBLIC
        //{label: "empathy1", speaker: player.name, dialogue: ""}
        {label: "empathy1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        {label: "empathy2", speaker: player.name, dialogue: "So I don't know why you're complaining about it now."},
        {label: "empathy3", speaker: player.name, dialogue: "But I do understand that some people are struggling every day, and I want to tell you:"},
        {label: "empathy4", speaker: player.name, dialogue: "I am right there, struggling with you."},
        {label: "empathy5", speaker: player.name, dialogue: "Last week, my wife and I came to the decision that we would have to make sacrifices in our own food budget."},
        {label: "empathy6", speaker: player.name, dialogue: "The wreckless spending of the Conservative Party means that Waitrose is now simply too expensive for us."},
        {label: "empathy7", speaker: player.name, dialogue: "Instead, we would have been forced to buy food from the Sainsbury's Taste The Difference range.", func: () => player.modifyPressRating(-10, -15)},
        {label: "empathy8", speaker: player.name, dialogue: "Luckily, my son picked up a local paper route and mowed some neighbours lawns so we could keep going to Waitrose."},
        {label: "empathy9", speaker: player.name, dialogue: "Why don't you see if you can get a local paper route, or see if your neighbours need their lawn mowing?"},
        {label: "empathy10", speaker: player.name, dialogue: "If we all did that, we could all go to Waitrose, which I think would be fun."},
        {label: "empathy11", speaker: reporter, dialogue: "Terrifying news from Westminster as PM suggests I do manual labour.", func: () => player.modifyPressRating(-5, -10), response: econSpeechResponses},

        //PROPOSE A SMALL WEALTH TAX
        //{label: "wealth1", speaker: player.name, dialogue: " "},
        {label: "wealth1", speaker: player.name, dialogue: "When the Labour Party formed this government, we told you that there were tough times ahead."},
        {label: "wealth2", speaker: player.name, dialogue: "Everyone has to pitch in. That means we will be propsing a small wealth tax."},
        {label: "wealth3", speaker: player.name, dialogue: "Those in the highest tax bracket will have their tax rate increased by 0.00001%.", func: () => player.modifyPressRating(-20, -30)},
        {label: "wealth4", speaker: reporter, dialogue: "Mr Prime Minister! This just in from Laura Kuenssberg: apparently every millionaire is now leaving the country, including Laura Kuenssberg!"},
        {label: "wealth5", speaker: player.name, dialogue: "Oh uhhhh, forget that, we're not doing that. That was just me being my usual funny self!"},
        {label: "wealth6", speaker: player.name, dialogue: "Haw haw haw.", response: econSpeechResponses},

        //FIX THE NHS
        //{label: "NHS1", speaker: player.name, dialogue: " "},
        {label: "NHS1", speaker: player.name, dialogue: "Britain led the way in technology. It was a Scotsman who invented the telephone. An Englishman invented the World Wide Web."},
        {label: "NHS2", speaker: player.name, dialogue: "And the Welsh are also here."},
        {label: "NHS3", speaker: reporter, dialogue: "What's a Welsh?", func: () => player.modifyPressRating(-5, -5)},
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
        {label: "housing8", speaker: reporter, dialogue: "He's talking about my Dad <3", func: () => player.modifyPressRating(5, 10)},
        {label: "housing8", speaker: otherReporters, dialogue: "Awwwwww...", response: econSpeechResponses},

        {label: "growth1", speaker: player.name, dialogue: "...",},
        {label: "growth2", speaker: player.name, dialogue: "......"},
        {label: "growth3", speaker: player.name, dialogue: "GROOOWWTTTHHH!!!!", func: () => player.modifyPressRating(5, 10), response: econSpeechResponses},

        //BE INEXPLICABLY RACIST
        {label: "racism", speaker: player.name, dialogue: "[Author's Note: I ain't writing this.]", func: () => player.modifyPressRating(100, 100), response: econSpeechResponses},

        //ADRDRESS WEALTH INEQUALITY
        {label: "left1", speaker: player.name, dialogue: "Whatever we do, however far we go to the right, it's not enough for you people."},
        {label: "left2", speaker: reporter, dialogue: "He's right, it's not."},
        {label: "left3", speaker: player.name, dialogue: "We're outflanking Reform from the right on immigration, and it's still not working!"},
        {label: "left4", speaker: player.name, dialogue: "What if..."},
        {label: "left4", speaker: player.name, dialogue: "What if we actually addressed the material, economic inequalities that define this country?"},
        {label: "left5", speaker: player.name, dialogue: "What if we actually addressed that we live in a society based on the exploitation of the poor by the rich?"},
        {label: "left6", speaker: player.name, dialogue: "Or if that's too much..."},
        {label: "left7", speaker: player.name, dialogue: "How about we just stopped being so racist?", func: () => endGame(kicked)},
        
        //End Speech
        {label: "end1", speaker: player.name, dialogue: "Sacrifices must be made, but it is necessary to build Britain back bett- I mean to get Britain's future back, together.", func: () => setPressCompletedToTrue()},
    ]
}

//------------------------SPECIFIC DIALOGUE FUNCTIONS--------------------------//

function handleEndSpeechChoice() {
    //Checks if player has chosen a dialogue option yet. If so, adds a new response object that allows player to end the speech.
    if (!allowEndSpeech) {
        econSpeechResponses[econSpeechResponses.length] = {r: "[END SPEECH]", goTo: "end1"};
        allowEndSpeech = true; //Bool ensures that the End Speech node is only added once.
    }
}

//-----------------FUNCTIONS FOR GENERAL DIALOGUE UPDATING---------------------//

function updateDialogue() { //Called each time player presses space bar to dismiss a dialogue node or select a response

    //Checks if gameState is in dialogue or respond, then calls appropriate function to load next node
    if (gameState === dialogue) {
        updateFromDialogueNode();
    }
    
    else if (gameState === respond) {
        updateFromResponseNode();
    }

}

function updateFromDialogueNode() {
    //Called when player dismisses a dialogue node (i.e. not when selecting a response node)

    //Checks if dialogue has a function to run
    if (currentNode.func != undefined) currentNode.func();
    
    //Checks if player's pressRating is now less than 0 (which ends the game)
    if (player.pressRating <= 0) {
        endGame(lose);
        switchState(transition);
        return; //this stops the function from running any code below this point within this function
    }

    //Checks if above functions have changed gameState has changed to transition, in which case no more functions should run.
    if (gameState === transition) return;

    //Checks if a response node should be loaded
    if (currentNode.response != undefined) {
        currentSelection = 0; //intiialises currentSelection to 0 so cursor always begins on the first page and on the first response option
        switchState(respond); //switches to respond gameState
        return;
    }

    //For safety, double checks that game is still in correct state
    else if (gameState != dialogue) {
        switchState(dialogue);
        return;
    }

    //This handles which node to go to next
    if (currentNode.goTo === undefined || currentNode.goTo === end) { //If there is no goTo or the goTo says "end"
        if (currentIndex >= currentEvent.length - 1 || currentNode.goTo === end) { //check if there are any more nodes in event or if goTo instructions say "end"
            endDialogue(walk); //end dialogue and go to walk State
        } else { //If goTo is undefined and there are no other instructions
            //Load next node at next index in dialogue event array
            currentIndex++;
            currentNode = currentEvent[currentIndex];
        }
    }
    else {
        //If there is a goTo instruction, find node with that label and go to that node
        //NOTE ON FIND FUNCTION: this is a javascript function. It goes through every element inside the currentEvent array and checks inside each one (that's what => means here) 
        //to see if its label matches the string inside the goTo instruction in the currentNode. If match is found, it sets currentNode to the matched node.
        currentNode = currentEvent.find((node) => node.label === currentNode.goTo);
        currentIndex = currentEvent.indexOf(currentNode);
    }
}

function updateFromResponseNode() {
    //Called when player selects a dialogue option

    if (press) handleEndSpeechChoice(); //Checks if the 'END SPEECH' option needs to be added.
    
    //Checks if there are any functions associated with the selected dialogue node
    if (currentNode.response[currentSelection].func != undefined) { currentNode.response[currentSelection].func(); };

    //If there is no node linked to the response, go back to walk state.
    if (currentNode.response[currentSelection].goTo === undefined || currentNode.response[currentSelection].goTo === end) {
        switchState(walk);
        return;
    }

    //... otherwise, load the next dialogue node!
    else {
        let prevNode = currentNode;
        currentNode = currentEvent.find((node) => node.label === currentNode.response[currentSelection].goTo);
        currentIndex = currentEvent.indexOf(currentNode);
        
        //PRESS CHECK!
        if (press) {
            //if press is true, remove whichever dialogue option was just selected from the econSpeechResponses object
            prevNode.response.splice(currentSelection, 1);
        }
        switchState(dialogue); //switch back to dialogue mode.
    }
}

function startDialogue(npc) {
    //When player presses space bar while facing an NPC...
    currentEvent = npc.dialogueEvent; //... set currentEvent to the dialogue Event stored in NPC
    currentIndex = 0;
    currentNode = npc.dialogueEvent[currentIndex]; //... sets currentNode to the first dialogue node in dialogue event

}

//Function to end dilaogue and set which state to call next
function endDialogue(nextState) {
    switchState(nextState)
}


//--------------------------------------DRAWING BOX/TEXT---------------------------------------//

//DRAWING DIALOGUE BOX
function drawDialogueBox() {

    //BOX VARIABLES
    //I have decided to declare these values locally within this function then pass relevant values to text functions beow...
    let boxOriginX = (tileSize*tilesX)*0.05;
    let boxSizeX =  (tileSize*tilesX)*0.9;
    let boxSizeY = (tileSize * tilesX)*0.4;
    let boxOriginY; //this is the only vary that values!
    let cornerRadius = 30; //curve on edge of dialogue box

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

    //SET COLOURS
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red;

    //Draw Box
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius);

    if (press) { //Check if press is true
        //If so, draw ratings box
        displayRatings(boxOriginX, boxSizeX, cornerRadius);
    }

    //Checks what state player is in...
    if (gameState === dialogue) {
        //... if dialogue, run code to render dialogue text
        drawDialogueText(boxSizeX, boxSizeY, textOriginX, textOriginY, boxTextPadding);
    }
    else if (gameState === respond) {
        ///... if respond, run code to display response options...
        drawResponseText(boxOriginX, boxOriginY,  boxSizeX, boxSizeY, textOriginX, textOriginY, cornerRadius)
    }
}

//function to draw ratings boxes and display ratings inside
function displayRatings(boxOriginX, boxSizeX, cornerRadius) {

    //Set values for origin and size of ratings box
    let ratingsBoxOriginX = boxOriginX + tileSize;
    let ratingsBoxOriginY = (tileSize * 7.5 + 10);
    let ratingsBoxSizeX = boxSizeX - (tileSize * 2);
    let ratingsBoxSizeY = tileSize * 1.5;
    
    //Set Colours
    stroke(5, 93, 169); //labour blue
    strokeWeight(10);
    fill(228, 0, 59); //labour red;

    //Draw outer box
    rect(ratingsBoxOriginX, ratingsBoxOriginY, ratingsBoxSizeX, ratingsBoxSizeY, cornerRadius);

    //Create local values for storing pressRating and publicRating as percentage
    let pressRating = (tileSize * 3.7) * (player.pressRating / 100);
    let publicRating = (tileSize * 3.7) * (player.publicRating / 100);

    //Sets location to draw the bar on the X axis
    let barOriginX = ratingsBoxOriginX + tileSize * 2.8;
    let barSizeX = tileSize * 3.7;

    //Sets size and colour for outer bar
    strokeWeight(2),
    stroke(255)
    fill (0),

    //Draws bar for outer bar
    rect(barOriginX, ratingsBoxOriginY + 20, barSizeX, 18);
    rect(barOriginX, ratingsBoxOriginY + 50, barSizeX, 18);

    //draws bar for inner bar
    noStroke();
    fill(5, 93, 169);
    rect(barOriginX + 1, ratingsBoxOriginY + 21, pressRating, 16);
    rect(barOriginX + 1, ratingsBoxOriginY + 51, publicRating, 16);

    //Displays text for each bar
    noStroke();
    fill(255, 255, 255);
    textAlign(RIGHT);
    textSize(18);
    text("PRESS RATING:  ", ratingsBoxOriginX + tileSize * 2.8, ratingsBoxOriginY + 35);
    text("PUBLIC RATING:  ", ratingsBoxOriginX + tileSize * 2.8, ratingsBoxOriginY + 65);
    textAlign(LEFT);
    text(player.pressRating + "%", ratingsBoxOriginX + tileSize * 3.2 + tileSize*3.5, ratingsBoxOriginY + 35);
    text(player.publicRating + "%", ratingsBoxOriginX + tileSize * 3.2 + tileSize*3.5, ratingsBoxOriginY + 65);
}

function drawDialogueText(boxSizeX, boxSizeY, textOriginX, textOriginY, boxTextPadding) {
    //Sets text properties for dialogue
    textSize(25);
    strokeWeight(0);
    stroke(255, 131, 131);
    fill(255, 255, 255);
    textAlign(LEFT);

    //Display Speaker Name
    textStyle(BOLD);
    text(currentNode.speaker, textOriginX, textOriginY, boxSizeX - (boxTextPadding * 1.5), boxSizeY - boxTextPadding);
    
    //Display dialogue
    textStyle(NORMAL);
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
    let cursorPosition; //Stores which of the options CURRENTLY ON SCREEN to highlight
    let page; //stores current page (array) of options to display
    if (currentSelection <= 3) {
        page = 0;
        cursorPosition = currentSelection;
        if (options.length > 1) { //if there is more than on page, display down arrow.
            image(downArrow, boxOriginX + boxSizeX - 60, boxOriginY + 200, 50, 50); //draws down arrow to indicate options below
        }
    }
    else {
        //If you are on the second page of options...
        page = 1;
        cursorPosition = currentSelection - 4;
        image(upArrow, boxOriginX + boxSizeX - 60, boxOriginY + 50, 50, 50); //draws up arrow to indicate options above
    }

    //Runs a for loop to draw the text on screen for each option and highlight the relevant option
    for (let x = 0; x < options[page].length; x++) {
        let selectionSizeY = 50;
        let selectionOriginX = textOriginX - 19;
        let selectionOriginY = textOriginY + (x * selectionSizeY) - 32;
        let selectionSizeX = boxSizeX - (tileSize*1.5);
        
        noStroke();

        if (cursorPosition === x) {
            //For selected option, colour WHITE
            fill(255, 255, 255);
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(0, 0, 0); // to set text to black
        } else {
            //For non-selected options, no box
            noFill();
            rect(selectionOriginX, selectionOriginY, selectionSizeX, selectionSizeY, cornerRadius);
            fill(255, 255, 255); //to set text to white
        }

        let num; //This will display the number of the option currently selected on screen in the text function below
        if (page === 0) num = x; //sets NUM to whatever iteration of the FOR loop we are on
        else num = x + 4; //sets NUM to the current iteration of the FOR loop + 4 as we are on second page

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
    //This is called every frame while dialogue or respond is active
    textFont(dialogueFont) //Sets font for dialogue
    drawDialogueBox();
}


//-----------------------ONE TIME FUNCTIONS--------------------//

function setPressCompletedToTrue() {
    //Checks if press event has ended
    pressCompleted = true;
}