/*
    Name: Michael Steiger
    Date: July 12th 2024
    Group07: Sessions
    File: script.js
*/
// Load common navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
})