/*
    Name: Michael Steiger
    Date: June 11th 2024
    Prog09: Dynamic Business Cards
    File: card.js
*/

// Define the functions
function printCard(card) {
    const cardContainer = document.getElementById('cardsContainer');
    const cardElement = document.createElement('div');
    cardElement.innerHTML = `
        <strong>Name: </strong>${card.name}<br>
        <strong>Email: </strong>${card.email}<br>
        <strong>Address: </strong>${card.address}<br>
        <strong>Phone: </strong>${card.phone}<br>
        <strong>Birthdate: </strong><input type="date" value="${card.birthdate}"><br>
        <hr>
    `;
    cardContainer.appendChild(cardElement);
}

// Define the class
function Card(name, email, address, phone, birthdate) {
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.birthdate = birthdate;
}


// Show cards button functionality (if needed for any future functionality)
document.getElementById('showCards').addEventListener('click', function() {
    // Logic to display all cards if needed
    // Create the objects
    var sue = new Card("Sue Suthers", "sue@suthers.com", "123 Elm Street, Yourtown ST 99999", "555-555-9876", "1957-06-06");
    var fred = new Card("Fred Fanboy", "fred@fanboy.com", "233 Oak Lane, Sometown ST 99399", "555-555-4444", "1987-07-07");
    var jimbo = new Card("Jimbo Jones", "jimbo@jones.com", "233 Walnut Circle, Anotherville ST 88999", "555-555-1344", "1977-08-08");

    // Now print them
    printCard(sue);
    printCard(fred);
    printCard(jimbo);
});
