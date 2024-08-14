/*
    Name: Michael Steiger
    Date: July 18th 2024
    Group08: Zipcode Distance
    File: script.js
*/
// Load commmon navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
})