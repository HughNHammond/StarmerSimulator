let transition = 0;
let dialogue = 1;
let walk = 2;
let state = transition;

function handleState() {
    switch (state) {
        case transition:
            console.log(state)
            break;

        case dialogue:
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