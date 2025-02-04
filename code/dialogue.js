boxOriginX = tileSize * 3;
boxOriginY = tileSize * 6;

boxSizeX = (tilesX - 6) * tileSize;
boxSizeY = tileSize * 5;

cornerRadius = 30;


function dialogueDraw() {
    handleBox();
}

function handleBox() {
    stroke(255, 131, 131); //soft red
    strokeWeight(10);
    fill(255, 245, 116); //soft yellow
    rect(boxOriginX, boxOriginY, boxSizeX, boxSizeY, cornerRadius)
}




// -----------------------------

//DIALOGUE OBJECTS

//FOR TEST CHARACTER

let testDialogue = {
    //
}