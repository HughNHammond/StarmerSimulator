//INTIALISE VARIABLES

 //location to start player when loading a level
playerStartX = 5;
playerStartY = 5;

//Player object
let player = {
    name: "STARMER", //to display in dialogue

    //Sprite info
    spriteIndex: 0, //index of sprite to currently show from sprites array
    sprites: null, //array containing all the sprites for a character
    spriteDirection: null, //determines which sprite to display to show the direction the player is facing
    animateWalk: false, //turns to true when walk animation should play (i.e. when walking)
    tileSize: tileSize, //local reference for tilesize
    size: tileSize, //local reference for sprite size

    //Player Position Data
    tileX: playerStartX, 
    tileY: playerStartY, 
    xPos: playerStartX * tileSize, 
    yPos: playerStartY * tileSize,
    tx: null,
    ty: null,

    //Movement 
    isMoving: false,
    dirX: 0,
    dirY: 0,
    speed: 6, //must be a factor (i.e. divisible by) tileSize.

    //RATINGS (for press ratings and public rating systems)
    pressRating: 50, //actual value
    publicRating: 40, //actual value
    nextPressRating: 50, //used to create the moving bar when rating goes up or down
    nextPublicRating: 40, //used to create the moving bar when rating goes up or down

    draw: function() {
        //Called from draw() in sketch.js to run anything I want to call from draw every frame
        player.display();
        player.handleRating();
        if (debug) player.displayName(); //for Debug
    },

    display: function() {
        //Display sprite
        image(this.spriteDirection[this.spriteIndex], this.xPos, this.yPos, this.size, this.size);
    },

    displayName: function() {
        //Display character name (used in debug)
        textFont(dialogueFont)
        fill("black");
        textSize(10);
        textAlign(CENTER);
        textStyle(NORMAL);
        noStroke();
        text(this.name, this.xPos + this.tileSize/2, this.yPos - 2);
    },

    modifyPressRating: function(pressMin, pressMax) {
        //This function calculate a value in a random range and adds it to nextPressRating
        let pressChange = Math.round(random(pressMin, pressMax + 1));
        this.nextPressRating = this.pressRating + pressChange;
    },

    modifyPublicRating: function() {
    //This function calculate a value in a random range and adds it to nextPublicRating
        let publicChange = Math.round(random(-5, 5));
        this.nextPublicRating = this.publicRating + publicChange;
    },

    handleRating: function() {
        //Called every frame, this function checks if there's a difference between rating and nextRating values, 
        //then adds or subtracts 1 from rating until it is the same as nextRating

        if (this.pressRating != this.nextPressRating) {
            if (this.pressRating < this.nextPressRating) {
                this.pressRating++;
            } else {
                this.pressRating--;
            }

            this.pressRating = clamp(this.pressRating, 0, 100)
        }

        if (this.publicRating != this.nextPublicRating) {
            if (this.publicRating < this.nextPublicRating) {
                this.publicRating++;
            } else {
                this.publicRating--;
            }

            this.publicRating = clamp(this.pressRating, 0, 100)
        }
    },
    
    setDirection: function() {
        //Check if we're NOT currently moving...
        if (!this.isMoving) {
            //if not, then let's set the direction the player is travelling!

            //UP
            if (keyIsDown(controls.up)) {
                this.dirX = 0;
                this.dirY = -1; //direction is up!
                this.spriteDirection = this.sprites.up
            }

            //DOWN
            if (keyIsDown(controls.down)) {
                this.dirX = 0;
                this.dirY = 1; //direction is down!
                this.spriteDirection = this.sprites.down;
            }

            //LEFT
            if (keyIsDown(controls.left)) {
                this.dirX = -1; //direction is left!
                this.dirY = 0; 
                this.spriteDirection = this.sprites.left;
            }

            //RIGHT
            if (keyIsDown(controls.right)) {
                this.dirX = 1; //direction is right!
                this.dirY = 0;
                this.spriteDirection = this.sprites.right;
            }

            //With the direction set, we can now move to the next code block to check if we can move!
            this.checkTargetTile();
        }
    },

    //This checks what tile the player wants to move to and if
    //the player is allowed to move there
    checkTargetTile: function() {
        //First, get what tile the player is currently on
        this.tileX = Math.floor(this.xPos / this.tileSize);
        this.tileY = Math.floor(this.yPos / this.tileSize);

        let nextTileHorizontal;
        let nextTileVertical;

        //Calculate the coordinates of the target tile
        if (this.dirX != 0 || this.dirY != 0) {
            nextTileHorizontal = this.tileX + this.dirX;
            nextTileVertical = this.tileY + this.dirY;
        }

        for (x = 0; x < activeNPCs.length; x++) {
            if (activeNPCs[x].tileX === nextTileHorizontal && activeNPCs[x].tileY === nextTileVertical) 
            {
                if (activeNPCs[x].collision) {
                     return;
                }
            }
        }

        //THIS CODE MAKES IT SO THE PODIUM CANNOT BE WALKED VERTICALLY THROUGH!
        if (podium.tileX === nextTileHorizontal && podium.tileY === nextTileVertical - 1 && this.dirY === 1 && currentLevel === exterior) {
            console.log(this.dirY)
            return;
        }
        else if (podium.tileX === nextTileHorizontal && podium.tileY === nextTileVertical && this.dirY === -1 && currentLevel === exterior) {
            return;
        }

        //check is that tile is in bounds of the map
        // remember: && means AND (i.e. below is asking if ALL conditions are true)
        if (
            
            nextTileHorizontal >= 0 && //top of map
            nextTileHorizontal < tilesX && //bottom of map
            nextTileVertical >= 0 && //left edge of map
            nextTileVertical < tilesY //right edge of map
        ) {
            //if it is in bounds, have we set it as moveable in our ruleMap:
            if (tileRules[nextTileVertical][nextTileHorizontal] === 0) { // remember we have to swap these!
                //if the target tile is walkable, then...
                //...calculate the precise x and y coordinate of the target tile...
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                
                //Because the player is ready to move there, we can set isMoving to true!
                this.isMoving = true;
            } 
            else if (tileRules[nextTileVertical][nextTileHorizontal] === 2) {
                if (pressCompleted) { //Checks if speech has concluded and ends the game upon leaving outside Number 10
                    endGame(win);
                    return;
                }
                //else just load the next level!
                loadLevel(levels[currentLevel.nextLevel])
            }
        }
    },

    move: function() {
        //Stores previous xPos and yPos in variable to compare if any change has occurred for animation
        let lastXPos = this.xPos;
        let lastYPos = this.yPos;

        //This is in our draw loop, so called move() is called every frame BUT...
        if (this.isMoving) {
            //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
            //So first, start by moving in direction set by setDirection()
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            //Now check if player has reached targetX
            if (this.xPos === this.tx && this.yPos === this.ty) {

                //if there, stop moving and reset our variables
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }

        //Move the player if there is a diference between pos and lastPos
        if (lastXPos != this.xPos || lastYPos != this.yPos) {
            this.animateWalk = true;
        }
        else {
            //otherwise, don't animate teh sprite and default to the sprite at index 0 in the array (default standing sprite)
            this.animateWalk = false;
            this.spriteIndex = 0;
        }
    },

    animateSprite: function() {
        //Animation function, sets timer and then checks if a certain amoutn of time has passsed. If it has, it loads the next sprite.
        if (this.animateWalk) {
            if (count - lastCount >= timerMax) {
                lastCount = count;
                this.spriteIndex++;
                if (this.spriteIndex >= this.spriteDirection.length) this.spriteIndex = 0; //this checks if this.spriteIndex is bigger than the direction array length. If it is, reset to 0.
            }
        }
        else { //if this.animation = false, it sets our sprite back to 0.
            this.spriteIndex = 0;
        }
    }
}