// Michael Steiger
// June 15th 2024
// CPSC 3750
// Program Exam #1 
// Grade Level: A


// Event listener for the start button
document.getElementById('startButton').addEventListener('click', function (){
    const number = parseInt(document.getElementById('numberInput').value);
    const primes = [];
    const nonPrimes = [];

    // Loop through numbers from 2 to the input number
    for (let i = 2; i <= number; i++){
        if (isPrime(i)) {
            primes.push(i);
        } else {
            nonPrimes.push(i);
        }
    }

    // Display the prime numbers and non-prime numbers on the page
    displayList('primeList', primes);
    displayList('nonPrimeList', nonPrimes);
});

// Function to check if a number is prime
function isPrime(num) {
    // Numbers less than or equal to 1 are not prime
    if (num <= 1) return false;
    // Loop through numbers from 2 to the input number - 1
    for (let i = 2; i < num; i++){
        // If the number is divisible by any other number, it is not prime
        if (num % i === 0) return false;
    }
    // If none of the conditions above are met, the number is prime
    return true;
}

// Function to display a list of numbers on the page
function displayList(elementId, list) {
    const listElement = document.getElementById(elementId);
    listElement.innerHTML = '';
    // Loop through each number in the list and create a list item
    list.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });
}

// Event listeners for the sum buttons
document.getElementById('sumPrimeButton').addEventListener('click', function () {
    const primes = document.getElementById('primeList').getElementsByTagName('li');
    const sum = Array.from(primes).reduce((total, item) => total + parseInt(item.textContent), 0);
    document.getElementById('sumPrime').textContent = 'Sum: ' + sum;
});

document.getElementById('sumNonPrimeButton').addEventListener('click', function () {
    const nonPrimes = document.getElementById('nonPrimeList').getElementsByTagName('li');
    const sum = Array.from(nonPrimes).reduce((total, item) => total + parseInt(item.textContent), 0);
    document.getElementById('sumNonPrime').textContent = 'Sum: ' + sum;
});

// Interval function to change the text color of the prime and non-prime lists
let colorChangeInterval = setInterval(changeColors, 5000);

// Function to change the text color of the prime and non-prime lists
function changeColors() {
    const primeList = document.getElementById('primeList');
    const nonPrimeList = document.getElementById('nonPrimeList');

    primeList.style.color = getRandomColor();
    nonPrimeList.style.color = getRandomColor();
}

// Function to generate a random color in hexadecimal format
function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

