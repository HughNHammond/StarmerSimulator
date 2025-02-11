//CLAMPS VALUE TO SPECIFIC RANGE
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

//Allows you to pass a value and then set a rate of change (e.g. in my dialogueSelect thing, I pass the currentResponse and then set it to minus or add 1  based on input)
function setValueChange(value, change) {
    target.v = value;
    target.c = change;
}