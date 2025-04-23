//CLAMPS VALUE TO SPECIFIC RANGE
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

//Allows you to pass a value and then set a rate of change (e.g. in my dialogueSelect thing, I pass the currentResponse and then set it to minus or add 1  based on input)
function setValueChange(value, change) {
    target.v = value;
    target.c = change;
}

let count = 0;
let lastCount = 0
let timerMax = 6;

function timer(lastCount, timerEnd) {
    if (count - lastCount >= timerEnd) {
        return true;
    }
    else {
        return false;
    }
}