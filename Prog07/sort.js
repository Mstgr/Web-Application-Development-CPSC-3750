/*
    Name: Michael Steiger
    Date: June 7th 2024
    Prog07: Javascript Sort
    File: sort.html
*/

var numberNames = 0;
var names = [];

function SortNames() {
    // Get the name from the text field and convert it to uppercase
    var name = document.theform.newname.value.toUpperCase();
    // Add the name to the array
    names[numberNames] = name;
    // Increment the counter
    numberNames++;
    // Sort the array
    names.sort();
    // Create a numbered list
    var sortedNames = names.map((name, index) => `${index + 1}. ${name}`);
    // Display the sorted names in the textarea
    document.theform.sorted.value = sortedNames.join("\n");
    // Clear the input field
    document.theform.newname.value = '';
}

// Function to handle the Enter key
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        SortNames();
    }
}

// Add event listener for the Enter key
document.addEventListener('DOMContentLoaded', function() {
    document.theform.newname.addEventListener('keypress', handleKeyPress);
});
