/*
   Name: Michael Steiger
   Date: July 24th 2024
   Group09: Dynamic Buttons
   File: script.js
*/
// The click logic works well no fixing was needed here
document.body.addEventListener('click', function() {
   // Generate a random uppercase letter
   const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
   // Create a new button element
   const button = document.createElement('button');
   // Set the button's text to the random letter
   button.textContent = letter;
   // Append the new button to the container
   document.getElementById('buttonContainer').appendChild(button);
});


//Load the navbar
document.addEventListener('DOMContentLoaded', function () {
   fetch('/navbar.html')
       .then(response => response.text())
       .then(html => {
           document.getElementById('navbar-placeholder').innerHTML = html;
       })
       .catch(error => console.error('Error loading navbar.html', error));
})
