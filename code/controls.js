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
    f: 70
}

function keyPressed() {

    //IF PLAYER PRESSES SPACE KEY, SWITCHES BETWEEN DIALOGUE AND WALK STATE (FOR TESTING)

    if (keyCode === controls.spacebar && gameState === walk) {
        //CHECKS IF PLAYER IS NEAR NPC AND INITIATES DIALOGUE
        for (let npc = 0; npc < activeNPCs.length; npc++) {
            let npcX = activeNPCs[npc].tileX - player.tileX;
            let npcY = activeNPCs[npc].tileY - player.tileY;
        
            switch (`${npcX},${npcY}`) { //the `` here creates a string template, where it takes the value of dx and dy
                                     //and creates a string with those values.
                case "0,-1": // NPC is above the player
                case "0,1":  // NPC is below the player
                case "1,0":  // NPC is to the right of the player
                case "-1,0": // NPC is to the left of the player
                    console.log(npcs[npc]);
                    if (activeNPCs[npc] === podium) press = true;
                    else press = false;
                    switchState(dialogue);
                    startDialogue(activeNPCs[npc]);
                    break;
            }
        }

        if (player.tileX === podium.tileX && player.tileY === podium.tileY) {
            switchState(dialogue);
            press = true;
            startDialogue(podium)
        }
    } 

    //IF PLAYER IN DIALOGUE AND NO RESPONSE, MOVE TO NEXT NODE (OR END)
    else if (keyCode === controls.spacebar && (gameState === dialogue || gameState === respond)) {
        updateDialogue(); //checks whether to end Dialogue or move to next Node
    } 

    //IF PLAYER HAS SELECTED RESPONSE...
    else if (keyCode === controls.spacebar && gameState === respond) {

    }

    //IF IN TRANSITION STATE
    else if (keyCode === controls.spacebar && gameState === transition) {
        //END TRANSITION
        console.log("Called from spacebar")
        setTransition(endTransition)
    }

    if (gameState === respond) {
        if (keyCode === controls.up) {
        currentSelection--
        }
        else if (keyCode === controls.down) {
        currentSelection++
        }
        
    }

    //TOGGLES DEBUG DISPLAY FOR MAP
    if (keyCode === controls.slash) {
        debug = !debug;
    }

    //TOOGLES BETWEEN WALK AND DIALOGUE STATES FOR DEBUG
    if (keyCode === controls.shift) { // FOR DEBUG
        if (gameState === walk) {
            nextState(dialogue)
        } else if (gameState === dialogue) {
            nextState(walk)
        }
    }

    if (keyCode === controls.f && debug) {
        flipDialogueBox = !flipDialogueBox;
        console.log('test')
    }

    if (keyCode === controls.f && !debug) {
        setTransition(startTransition)
    }
}