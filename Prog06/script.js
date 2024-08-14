/*
    Name: Michael Steiger
    Date: June 7th 2024
    Prog06: Moving Buttons
    File: script.js
*/

// This script creates a webpage that allows the user to add buttons to a viewing area (as described in the Introductions).
// The user can select a color for the buttons from a dropdown menu, and the buttons will
// randomly appear on the viewing area. Each button has a random number displayed on it.
// The user can click on the buttons to change their color, and the total number of clicks
// on the buttons will be displayed. Additionally, the user can start and stop the movement
// of the buttons by clicking on the "MOVE" button. The buttons will move in a random direction
// at a speed of 5 pixels per interval.

const viewingArea = document.getElementById('viewingArea');
const colorDropdown = document.getElementById('colorDropdown');
const makeButton = document.getElementById('makeButton');
const moveButton = document.getElementById('moveButton');
const totalDisplay = document.getElementById('total');
let buttons = [];
let total = 0;
let moving = false;
let interval;

makeButton.addEventListener('click', () => {
    // Create a new button, set its color and display a random number on it
    const color = colorDropdown.value;
    const button = document.createElement('button');
    button.className = 'button';
    button.style.backgroundColor = color;
    button.textContent = Math.floor(Math.random() * 100);

    // Set the position of the button randomly on the viewing area
    const { offsetWidth: width, offsetHeight: height } = button;
    const maxX = viewingArea.clientWidth - width;
    const maxY = viewingArea.clientHeight - height;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    // Add an event listener to change the color of the button when it is clicked
    button.addEventListener('click', () => {
        const newColor = colorDropdown.value;
        button.style.backgroundColor = newColor;
        total += parseInt(button.textContent, 10);
        totalDisplay.textContent = `Total: ${total}`;
    });

    // Add the button to the viewing area and store its position and movement direction
    viewingArea.appendChild(button);
    buttons.push({ element: button, directionX: Math.random() * 2 - 1, directionY: Math.random() * 2 - 1 });
});

moveButton.addEventListener('click', () => {
    // Start or stop the movement of the buttons
    if (moving) {
        clearInterval(interval);
        moveButton.textContent = 'MOVE';
    } else {
        interval = setInterval(moveButtons, 100);
        moveButton.textContent = 'PAUSE';
    }
    moving = !moving;
});

function moveButtons() {
    // Move the buttons in a random direction, and reverse the direction when they hit the edges
    buttons.forEach(btn => {
        let { element, directionX, directionY } = btn;
        let x = element.offsetLeft + directionX * 5;
        let y = element.offsetTop + directionY * 5;

        if (x <= 0 || x >= viewingArea.clientWidth - element.offsetWidth) {
            directionX *= -1;
            x = Math.max(0, Math.min(x, viewingArea.clientWidth - element.offsetWidth));
        }
        if (y <= 0 || y >= viewingArea.clientHeight - element.offsetHeight) {
            directionY *= -1;
            y = Math.max(0, Math.min(y, viewingArea.clientHeight - element.offsetHeight));
        }

        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        btn.directionX = directionX;
        btn.directionY = directionY;
    });
}
