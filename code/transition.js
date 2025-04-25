//INTIALISED VARIABLES

//Values to handle transparency for fade
let fade = 0;
let transitionChange = 10; //how much to iterate transparency per frame to create fade in/fade out effect
let transitioning = false; //bool to check if transitioning is currently happen (used in controls.js to disable input!)

//Transition State Machine
let transitionState;
let startTransition = 0
let waitTransition = 1
let transitionToControls = 2;
let transitionToBlack = 3;
let transitionFromBlack = 4;
let endTransition = 5;


//State machine to control which content to show on screen when in transition gameState.
let start = 0;
let controlsScreen = 1;
let kicked = 2;
let lose = 3;
let win = 4;

let transitionScreen = start; //Currently displayed value in currentTransitioNText, defaults to start on intitialisation


//Array of winText to display on win screen, a random one is picked
let winText = [
    "The University of York estimates that cuts to social care between 2010-2014 caused 57,000 deaths.\nHow many more will die due Labour's disability cuts?",
    "The Labour Party refuses to remove the two-child benefit cap. Child Poverty Action Group estimates 10,000 more children live in poverty since Labour's election.",
    "EveryDoctor found that since 2023, Labour Party MPs have received over £2 million in donations from donors linked to private healthcare. This is four times more than all other parties combined.",
    "You feel nothing."
]

let winTextIndex; //Index of the value used generated to select which winText element to display


function handleTransition() {
    //This functions handles switching between transition states
    switch (transitionState) {
        case startTransition: //transition to fade in

            transitioning = true; //sets transitioning to true to stop certain inputs in controls.js

            if (transitionScreen != controlsScreen) { //if not on control screen...
                mapEnabledDraw(); //Keep map loaded so it appears behind the transition box
            }

            handleFade(transitionChange); //fades screen in
    
            if (fade >= 255) {
                transitionState = waitTransition; //when fade = 255 (maximum alpha value), switch to the waitTransitoin state
            }
            break;

        case waitTransition:
            //Stay in transition state but don't fade in or out
            transitioning = false; //allows inputs
            fade = 255; //no transparency on images or text
            break;

        case transitionToControls:
            //Bespoke transition state for transitioning from start menu to controls menu

            transitioning = true;
            handleFade(-transitionChange) //transitionChange is negative here as we're going to take away from fade (to make image more transparent)

            if (fade <= 0) {
                transitioning = false;
                transitionScreen = controlsScreen; //sets controlScreen as display
                setTransition(startTransition)
            }
            break;

        case transitionToBlack:
            //For transitioning to pure black (between transition screen)
            transitioning = true;
            handleFade(-transitionChange)
            if (fade <= 0) {
                transitioning = false;
                transitionScreen = start;
                setTransition(transitionFromBlack)
            }
            break;
                
        case transitionFromBlack:
            //For transitioning form black screen back to start screen
            transitioning = true;
            handleFade(+transitionChange)
            if (fade >= 255) {
                endTransition = false;
                transitioning = false;
                transitionScreen = start;
                setTransition(waitTransition)
            }
            break;

        case endTransition:
            transitioning = true;
            mapEnabledDraw(); //KEEPS MAP FOR TRANSITION
            handleFade(-transitionChange)
            if (fade <= 0) {
                endTransition = false;
                transitioning = false;
                switchState(walk);
            }

    }
   //console.log("Inside handleTransition, transitionState is " + transitionState)

    transitionContent = transitionScreen;
    getTransitionText()

}

function setTransition(state) {

    //check if material should fade in or out
    if (state === startTransition) fade = 0;
    else if (state === endTransition) fade = 255;
    
    //set transitionState
    transitionState = state;
    switchState(transition)
}

function handleFade(change) {
    //Each frame add the value of change to fade
    fade += change;
}


//------DAY TRANSITION SCREEN-----//


let transitionContent;

function getTransitionText() {
    //console.log(currentDay)
    switch (transitionScreen) {
        case start: //start

            //Set Text Properties
            textFont(startFont)
            textAlign(CENTER)
            
            //Create a black box to display over anything on screen so that it looks like we're fading to black to cover map
            fill(0, 0, 0, fade);
            rect(0, 0, width, height);
        
            //Display game title: STARMER SIMULATOR
            textSize(50),
            fill(228, 0, 59, fade)
            textStyle(BOLD)
            text("STARMER", width/2, height/2+130)
            text("SIMULATOR", width/2, height/2+180)

            //Reset textStyle to normal for further stuff
            textStyle(NORMAL)
            
            //Properties for non-title text
            fill(150, fade)
            textSize(15);
            text("Press C for CONTROLS", width/2, height/2+215)
            textSize(17)
            text("Press SPACE BAR to START GAME", width/2, height/2+240)
            
            //Create imagine
            tint(255, fade) //changes the hue of the image
            imageMode(CENTER)
            image(startImage, width/2, 180, 550, 300)
            
            //RESET SPECIAL PARAMETERS TO NOT EFFECT IMAGES LOADED AFTER THE TITLE IMAGE
            noTint(); //removes any tint for any further images loaded after the title image (i.e. everything else in the game)
            imageMode(CORNER) 
            break;

        case controlsScreen:

            //Create a black box to display over anything on screen so that it looks like we're fading to black, for saftey here
            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            //Handle control text
            fill(228, 0, 59,fade)
            textFont(startFont)
            textAlign(CENTER);
            textSize(50)
            text("CONTROLS", width/2, 125);

            //Handle images and text to explain controls 
            tint(255, fade)
            noSmooth();
            image(wsad, width*0.15, 150, 200, 200)
            textAlign(CENTER)
            textSize(15)
            text("Move \n\n Navigate Dialogue", width*0.5, 240, 300, 100)
            image(spacebarSprite, width*0.15, 320, 200, 200)
            text("Interact With NPCs/Podium \n\n Select Dialogue Option", width*0.5, 390, 300, 100)

            //Handle text to instruct player how to go back to start screen
            fill(150, fade)
            textSize(15);
            text("Press C to go back to START screen", width/2, height/2+255)

            break;

        case kicked:

            //Creates black box that fades over map to make it look like a fade to black
            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            //Sets text properties for any text below
            textAlign(CENTER)
            textFont (startFont)

            //Handle GAME OVER text
            textSize(40);
            fill(255);
            text("GAME OVER!", width/2, 150)

            //Handle game over explanation:
            textSize(20);
            fill(228, 0, 59, fade);
            text("YOU WERE KICKED OUT OF", width/2, 250);
            text("OF THE LABOUR PARTY!", width/2, 290);

            textSize(15);
            text("What are you, some sort of socialist?", width/2, 340)

            fill(255);
            text("Refresh your browser to try again.", width/2, 450)
            break;

        case lose:

            //Creates black box that fades over map to make it look like a fade to black
            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            //Sets text properties for any text below
            textAlign(CENTER)
            textFont (startFont)

            //Handle GAME OVER text
            textSize(40);
            fill(255);
            text("GAME OVER!", width/2, 150)

            //Handle game over explanation:
            textSize(30);
            fill(228, 0, 59, fade);
            text("THE PRESS THINK", width/2, 250);
            text("YOU'RE A SOCIALIST!", width/2, 290);

            textSize(15);
            text("Maybe you should have been more racist?", width/2, 340)

            fill(255);
            text("Refresh your browser to try again.", width/2, 450)
            break;
        
        case win:

            //Creates black box that fades over map to make it look like a fade to black
            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            //Sets text properties for any text below
            textAlign(CENTER)
            textFont (startFont)

            //Handle win text
            textSize(40);
            fill(255);
            text("CONGRATULATIONS!", width/2, 150)

            textSize(30);
            fill(228, 0, 59, fade);
            text("You won!", width/2, 200);

            //Handle what to display as win text
            textSize(15);
            rectMode(CENTER)
            textLeading(20)
            text(winText[winTextIndex], width/2, 350, width - 50, 150)
            rectMode(CORNERS)

            fill(255);
            text("Refresh your browser to try again.", width/2, 450)
            break;
    }
}

function setWinText() {
    //Selects a random string from the winText array and stores index in a variable
    winTextIndex = Math.round(random(winText.length-1))
}

//This is called from text to end the game. endState = whatever "transitionScreen" is
function endGame(endState) {
    transitionScreen = endState;
    setTransition(startTransition)
}