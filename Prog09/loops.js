/*
    Name: Michael Steiger
    Date: June 11th 2024
    Prog09: Dynamic Business Cards
    File: loops.js
*/

// Handle form submission
// Instead of using a loop and prompting the user for each input,
// I added an event listener to the form to handle the form submission like in the video provided 
// and as we learned in SAMS Chapter 9.
// I think this is a much better way to go about form submissions rahter than prompting the user for each input,
// and using a loop.
document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    var birthdate = document.getElementById('birthdate').value;
    var newCard = new Card(name, email, address, phone, birthdate);
    printCard(newCard);
});