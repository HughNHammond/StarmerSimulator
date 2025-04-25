//KEYS
let controls = {
    //Directions
    up: 87,
    down: 83,
    left: 65,
    right: 68,

    //Select
    spacebar: 32,

    //Debug
    shift: 16,
    slash: 191,
    f: 70,
    c: 67
}

function keyPressed() {

    //------------------------DIALOGUE CONTROLS------------------------//

    //TO TALK TO NPC
    if (keyCode === controls.spacebar && gameState === walk) { 
        //This checks which direction the player is facing
        
        let dirX;
        let dirY;

        switch (player.spriteDirection) {
            case player.sprites.up:
                dirX = 0;
                dirY = -1;
                break;
            case player.sprites.down:
                dirX = 0;
                dirY = 1;
                break;
            case player.sprites.left:
                dirX = -1;
                dirY = 0;
                break;
            case player.sprites.right:
                dirX = 1;
                dirY = 0;
        }

        //Then checks through all npcs in activeNPCs array...
        for (let npc = 0; npc < activeNPCs.length; npc++) {

            //And checks if there is an NPC in the tile the player is facing
            if (activeNPCs[npc].tileX === (player.tileX + dirX) && activeNPCs[npc].tileY === (player.tileY + dirY)) {
                //If there is, starts dialogue
                switchState(dialogue);
                startDialogue(activeNPCs[npc]);
            }
        }

        //This does the same thing, but adds a special condition to check if the NPC is a podium (the podium is an instantiation of the NPC class)
        if (player.xPos === podium.xPos && player.yPos === podium.tileY*tileSize && currentLevel.name === "exterior") {
            switchState(dialogue);
            press = true;
            startDialogue(podium)
        }
    } 

    //PLAYER PRESSES SPACE BAR TO UPDATE DIALOGUE NODE
    else if (keyCode === controls.spacebar && (gameState === dialogue || gameState === respond)) {
        updateDialogue(); //checks whether to end Dialogue or move to next Node
    } 

    //Allows the player to scroll through dialogue options
    if (gameState === respond) {
        if (keyCode === controls.up) {
        currentSelection--
        }
        else if (keyCode === controls.down) {
        currentSelection++
        }
    }

    //------------------------TRANSITION CONTROLS------------------------//

    //... to move from start screen to gameplay
    else if (gameState === transition && !transitioning && transitionScreen === start) {
        if (keyCode === controls.spacebar) setTransition(endTransition);
        else if (keyCode === controls.c) setTransition(transitionToControls)
    }
    
    //... if player wants to open controls screen
    else if (keyCode === controls.c && gameState === transition && !transitioning && transitionScreen === controlsScreen) {
        setTransition(transitionToBlack)
    }

    //------------------------MISCELLANEOUS INPUTS------------------------//

    //TOGGLES DEBUG
    if (keyCode === controls.slash) {
        //The commented out code below will enable the debug controls. This is commented out as this should only be active for debugging, not for a finished release!
        //debug = !debug; 
    }
}