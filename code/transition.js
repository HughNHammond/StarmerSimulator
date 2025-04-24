//INTIALISED VARIABLES

//V
let fade = 0;
//let transitionInProgress = false;
let noTransparency = 255;
let transitionChange = 10;
let transitioning = false;
let transparency = 0;

//Transition State Machine
let transitionState;
let startTransition = 0
let waitTransition = 1
let transitionToControls = 2;
let transitionToBlack = 3;
let transitionFromBlack = 4;
let endTransition = 5;



let winText = [
    "The University of York estimates 57,000 people died due to austerity cuts.\nHow many more will die due Labour's disability cuts?",
    "The Labour Party refuses to remove the two-child benefit cap. Child Poverty Action Group estimates 10,000 more children live in poverty since Labour's election.",
    "EveryDoctor found that since 2023, Labour Party MPs have received over £2 million in donations from donors linked to private healthcare. This is four times more than all other parties combined.",
    "You feel nothing."
]

let winTextIndex;


function handleTransition() {
    console.log(transitionState)
    switch (transitionState) {
        case startTransition:
            transitioning = true;
            if (currentTransitionText != controlsScreen) {
                mapEnabledDraw(); //KEEPS MAP FOR TRANSITION
            }

            handleFade(transitionChange);
    
            if (fade >= 255) {
                transitionState = waitTransition;
            }
            break;

        case waitTransition:
            transitioning = false;
            fade = 255;
            break;

        case transitionToControls:
            transitioning = true;
            handleFade(-transitionChange)
            if (fade <= 0) {
                console.log("active!")
                endTransition = false;
                transitioning = false;
                currentTransitionText = controlsScreen;
                setTransition(startTransition)
            }
            break;

            case transitionToBlack:
                transitioning = true;
                handleFade(-transitionChange)
                if (fade <= 0) {
                    endTransition = false;
                    transitioning = false;
                    currentTransitionText = start;
                    setTransition(transitionFromBlack)
                }
                break;
                
                case transitionFromBlack:
                    console.log(fade)
                    transitioning = true;
                    handleFade(+transitionChange)
                    if (fade >= 255) {
                        endTransition = false;
                        transitioning = false;
                        currentTransitionText = start;
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

    transitionContent = currentTransitionText;
    getTransitionText()

}

function setTransition(state, endDay) {

    if (endDay != null) endDay();

    //check if material should fade in or out
    if (state === startTransition) fade = 0;
    else if (state === endTransition) fade = 255;
    
    //set transitionState
    transitionState = state;
    switchState(transition)
}

function handleFade(change) {
    fade += change;
}


//------DAY TRANSITION SCREEN-----//


let transitionContent;

function getTransitionText() {
    //console.log(currentDay)
    switch (currentTransitionText) {
        case start: //start

            textFont(startFont)
            textAlign(CENTER)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);
        
            textSize(50),
            fill(228, 0, 59, fade)
            textStyle(BOLD)
            text("STARMER", width/2, height/2+130)
            text("SIMULATOR", width/2, height/2+180)
            textStyle(NORMAL)
            
            fill(150, fade)
            textSize(15);
            text("Press C for CONTROLS", width/2, height/2+215)
            textSize(17)
            text("Press SPACE BAR to START GAME", width/2, height/2+240)
            
            tint(255, fade)
            imageMode(CENTER)
            image(startImage, width/2, 180, 550, 300)
            noTint();
            imageMode(CORNER)
            break;

        case controlsScreen:

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            fill(228, 0, 59,fade)
            textFont(startFont)
            textAlign(CENTER);
            textSize(50)
            text("CONTROLS", width/2, 125);
            tint(255, fade)
            noSmooth();
            image(wsad, width*0.15, 150, 200, 200)
            textAlign(CENTER)
            textSize(15)
            text("Move \n\n Navigate Dialogue", width*0.5, 240, 300, 100)
            image(spacebarSprite, width*0.15, 320, 200, 200)
            text("Interact With NPCs/Podium \n\n Select Dialogue Option", width*0.5, 390, 300, 100)

            break;

        case kicked:

            textAlign(CENTER)
            textFont (startFont)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            textSize(40);
            fill(255);
            text("GAME OVER!", width/2, 150)

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
            
            textAlign(CENTER)
            textFont (startFont)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            textSize(40);
            fill(255);
            text("GAME OVER!", width/2, 150)

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


            textAlign(CENTER)
            textFont (startFont)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);

            textSize(40);
            fill(255);
            text("CONGRATULATIONS!", width/2, 150)

            textSize(30);
            fill(228, 0, 59, fade);
            text("You won!", width/2, 200);

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
    winTextIndex = Math.round(random(winText.length-1))
    console.log(winTextIndex)
}

function endGame(outcome) {
    currentTransitionText = outcome;
    setTransition(startTransition);
}