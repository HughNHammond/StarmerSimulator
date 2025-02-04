playerStartX = 2;
playerStartY = 2;

let player = {
    //Physical Properties
    sprite: null,
    tileSize: tileSize,
    size: tileSize,

    //Position
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
    speed: 5,

    display: function() {
        image(this.sprite, this.xPos, this.yPos, this.size, this.size)
    },

    setDirection: function() {
        //Check if we're NOT currently moving...
        if (!this.isMoving) {
            //if not, then let's set the direction the player is travelling!

            //UP
            if (keyIsDown(87)) {
                this.dirX = 0;
                this.dirY = -1; //direction is up!
            }

            //DOWN
            if (keyIsDown(83)) {
                this.dirX = 0;
                this.dirY = 1; //direction is down!
            }

            //LEFT
            if (keyIsDown(65)) {
                this.dirX = -1; //direction is left!
                this.dirY = 0; 
            }

            //RIGHT
            if (keyIsDown(68)) {
                this.dirX = 1; //direction is right!
                this.dirY = 0;
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

        //check is that tile is in bounds of the map
        // remember: && means AND (i.e. below is asking if ALL conditions are true)
        if (
            
            nextTileHorizontal >= 0 && //top of map
            nextTileHorizontal < tilesX && //bottom of map
            nextTileVertical >= 0 && //left edge of map
            nextTileVertical < tilesY //right edge of map
        ) {
            //if it is in bounds, have we set it as moveable in our ruleMap:
            if (tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
                //if the target tile is walkable, then...
                //...calculate the precise x and y coordinate of the target tile...
                this.tx = nextTileHorizontal * this.tileSize;
                this.ty = nextTileVertical * this.tileSize;
                
                //Because the player is ready to move there, we can set isMoving to true!
                this.isMoving = true;
            }
        }
    },

    move: function() {
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
    }
}