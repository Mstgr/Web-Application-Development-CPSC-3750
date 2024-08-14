/*
    Name: Michael Steiger
    Date: July 25th 2024
    Prog16: Audio Player
    File: script.js
*/

// Load the navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
});