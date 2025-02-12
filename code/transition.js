let fade = 0;
let transitionInProgress = false;


let transitionState;
let startTransition = 0
let waitTransition = 1
let endTransition = 2;

let transparency = 0;
let noTransparency = 255;

let transitionChange = 10;


function handleTransition() {
    switch (transitionState) {
        case startTransition:
            mapEnabledDraw(); //KEEPS MAP FOR TRANSITION
            handleFade(transitionChange);
    
            if (fade >= 255) {
                transitionState = waitTransition;
            }
            break;

        case waitTransition:
            fade = 255;
            break;

        case endTransition:
            //console.log("END TRANSITION" + fade)
            mapEnabledDraw(); //KEEPS MAP FOR TRANSITION
            handleFade(-transitionChange)
            if (fade <= 0) {
                endTransition = false;
                switchState(walk);
            }

    }
   //console.log("Inside handleTransition, transitionState is " + transitionState)

    transitionContent = currentDay;
    getDayText()

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

function getDayText() {
    //console.log(currentDay)
    switch (currentDay) {
        case start: //start
            textFont(startFont)
            textAlign(CENTER)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);
        
            textSize(50),
            fill(228, 0, 59, fade)
            text("STARMER SIMULATOR", width/2, height/2+200)
            textSize(20)
            text("Press the space bar to begin", width/2, height/2+250)
            
            tint(255, fade)
            imageMode(CENTER)
            image(startImage, width/2, 240, 700, 400)
            noTint();
            imageMode(CORNER)
            break;

        case day1:

            textAlign(CENTER)

            fill(0, 0, 0, fade);
            rect(0, 0, width, height);
        
            textSize(30),
            fill(228, 0, 59, fade)
            text("This is a test.", width/2, height/2)
            ///
            break;
    }
}