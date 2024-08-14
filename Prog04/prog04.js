// Change the background color of the entire page and increment the counter for the corresponding color
function changeBackground(color) {
    document.body.style.backgroundColor = color;
    incrementCounter(color);
}

// Increment the counter for the given color
function incrementCounter(color) {
    const counterElement = document.getElementById(`${color}Count`);
    const count = parseInt(counterElement.textContent) || 0;
    counterElement.textContent = count + 1;
}

// Change the background color of the button to the given color and the text color to white
function changeColor(color) {
    const button = document.getElementById(`${color}Button`);
    button.style.backgroundColor = color;
    button.style.color = 'white';
}

// Reset the background color of the button to transparent and the text color to the original color
function resetColor(color) {
    const button = document.getElementById(`${color}Button`);
    button.style.backgroundColor = 'transparent';
    button.style.color = color;
}

// Increment the hover count for the given color
function incrementHoverCount(color) {
    const counterElement = document.getElementById(`${color}HoverCount`);
    const count = parseInt(counterElement.textContent) || 0;
    counterElement.textContent = count + 1;
}
