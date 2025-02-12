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
            dialogueDraw()
            break;

        case respond:
            dialogueDraw()
            break;

        case walk:
            player.setDirection()
            player.move();
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
let day1 = 1;
let day2 = 2;
let day3 = 3;
let currentDay = start;

function handleDayState() {

}


function endDay() {
    console.log("End day called")
    currentDay++;
}