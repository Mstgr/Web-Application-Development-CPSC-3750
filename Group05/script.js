/*
    Name: Michael Steiger
    Date: July 11 2024
    Program: Group05: Hangman
    File: script.js
*/

// Needed variables
let wordToGuess = '';
let displayedWord = '';
let wrongGuesses = [];
const totalParts = 12;

// Start the game
function startGame() {
    const cheatMode = document.getElementById('cheatMode').checked;
    console.log(cheatMode);
    // Fetch a new word from the server
    fetch('getWord.php')
        .then(response => response.json())
        .then(data => {
            if (data.word) {
                setupGame(data.word);
                if (cheatMode) {
                    alert(data.word);
                }
            } else {
                console.error('Error fetching word:', data.error);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Setup the game
function setupGame(word) {
    wordToGuess = word.toUpperCase();
    displayedWord =  '_ '.repeat(word.length).trim();
    const wordToGuessDiv = document.getElementById('wordToGuess');
    wordToGuessDiv.innerHTML = displayedWord;
    generateLetterButtons();
    wrongGuesses = [];
    document.getElementById('wrongLetters').innerHTML = 'Letters Guessed Wrong:';
    document.getElementById('hangmanPart').src = '';
}

// Generate the letter buttons
function generateLetterButtons() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = ''; // Clear previous buttons
    letters.split('').forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        lettersDiv.appendChild(button);
    });
}

// Handle the user's correct guess by updating the displayed word
function guessLetter(letter) {
    console.log('Guessed letter:', letter);

    let updatedDisplayedWord = '';
    let isCorrectGuess = false;

    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            updatedDisplayedWord += letter + ' ';
            isCorrectGuess = true;
        } else {
            updatedDisplayedWord += displayedWord[i * 2] + ' ';
        }
    }

    if (isCorrectGuess) {
        displayedWord = updatedDisplayedWord.trim();
        document.getElementById('wordToGuess').innerHTML = displayedWord;
        checkWinCondition();
    } else {
        handleWrongGuess(letter);
    }
}

// Handle the user's incorrect guess by displaying the next part of the hangman
function handleWrongGuess(letter) {
    wrongGuesses.push(letter);
    document.getElementById('wrongLetters').innerHTML = `Letters Guessed Wrong: ${wrongGuesses.join(', ')}`;
    // Placeholder for handling what happens when the user guesses incorrectly
   
    const hangmanPartIndex = wrongGuesses.length;
    console.log("Hangman part index:", hangmanPartIndex);
    if (hangmanPartIndex < totalParts) {

        document.getElementById('hangmanPart').src = `hangman${hangmanPartIndex}.PNG`;
        console.log("Image:", `hangman${hangmanPartIndex}.png`);

    }else if(hangmanPartIndex === totalParts){
        document.getElementById('hangmanPart').src = `hangman${hangmanPartIndex}.PNG`;
        alert('Game Over! You ran out of guesses.');
        startGame();
    }
}

// Check if the user had guessed the entire word
function checkWinCondition() {
    if (!displayedWord.includes('_')) {
        alert('Congratulations! You guessed the word!');
    }
}

// Common Navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
})