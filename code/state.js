//STATE SYSTEM FOR CURRENT PLAY STATE

//States
let transition = 0;
let dialogue = 1;
let respond = 2;
let walk = 3;
let gameState;

function handlePlayState() {
    //Called from draw each frame, state determines which functions are called

    switch (gameState) {
        case transition:
            //For transitioning from game to start screen, game over screens, controls screens etc.
            handleTransition();
            break;

        case dialogue:
            //Runs the dialogue functions
            dialogueDraw();
            break;

        case respond:
            //Runs the respond functions
            dialogueDraw();
            break;

        case walk:
            //Runs the functions for navigating the map and controlling the player etc.
            player.setDirection()
            player.move();
            player.animateSprite();
            break;

        default:
            //default state caused if gameState has no value! This means there's a bug!
            console.log("ERROR! THERE IS NO STATE!")
    }
}

//Call this function to change state
function switchState(nextState) {
    gameState = nextState;
}



