//STATE SYSTEM FOR CURRENT PLAY STATE


let transition = 0;
let dialogue = 1;
let respond = 2;
let walk = 3;
let gameState;

function handlePlayState() {
    switch (gameState) {
        case transition:
            //console.log("I am in transition")
            handleTransition();
            break;

        case dialogue:
            dialogueDraw();
            break;

        case respond:
            dialogueDraw();
            break;

        case walk:
            player.setDirection()
            player.move();
            player.animateSprite();
            break;

        default:
            console.log("ERROR! THERE IS NO STATE!")
    }
}

function switchState(nextState) {
    gameState = nextState;
}


//-------------------------------------------------------------------------------------------------------------//

//STATE SYSTEM FOR CURRENT DAY


let start = 0;
let controlsScreen = 1;
let kicked = 2;
let lose = 3;
let win = 4;

let currentTransitionText = start;

function handleDayState() {

}


function endDay() {
    console.log("End day called")
    currentTransitionText++;
}