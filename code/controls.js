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

    //IF PLAYER PRESSES SPACE KEY, CHECKS WHICH DIRECTION PLAYER IS IN THEN 
    if (keyCode === controls.spacebar && gameState === walk) {

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

        for (let npc = 0; npc < activeNPCs.length; npc++) {

            if (activeNPCs[npc].tileX === (player.tileX + dirX) && activeNPCs[npc].tileY === (player.tileY + dirY)) {
                switchState(dialogue);
                startDialogue(activeNPCs[npc]);
            }
        }

        if (player.xPos === podium.xPos && player.yPos === podium.tileY*tileSize && currentLevel.name === "exterior") {
            switchState(dialogue);
            press = true;
            startDialogue(podium)
        }
    } 

    //IF PLAYER IN DIALOGUE AND NO RESPONSE, MOVE TO NEXT NODE (OR END)
    else if (keyCode === controls.spacebar && (gameState === dialogue || gameState === respond)) {
        updateDialogue(); //checks whether to end Dialogue or move to next Node
    } 

    //IF IN TRANSITION STATE
    else if (gameState === transition && !transitioning && currentTransitionText === start) {
        if (keyCode === controls.spacebar) setTransition(endTransition);
        else if (keyCode === controls.c) setTransition(transitionToControls)
    }
    else if (keyCode === controls.c && gameState === transition && !transitioning && currentTransitionText === controlsScreen) {
        setTransition(transitionToBlack)
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
    }

    if (keyCode === controls.f && !debug) {
        setTransition(startTransition)
    }
}