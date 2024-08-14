// Function to fetch results and display them
function fetchResults(fileName, title) {
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            document.getElementById('results').innerHTML = `<div class="result"><h2>${title}</h2><pre>${data}</pre></div>`;
        });
}
// Function to reset files
function resetFiles() {
    fetch('process_numbers.php?reset=true')
        .then(response => response.text())
        .then(data => {
            document.getElementById('results').innerHTML = '<div class="result"><h2>Files Reset:</h2><p>All files have been reset.</p></div>';
        });
}
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    const result = urlParams.get('result');
    // Check if the result parameter is set & display the numbers in a nice way
    if (result === 'checked') {
        document.getElementById('results').innerHTML = '<div class="result"><h2>Numbers Checked:</h2><p>Numbers have been categorized and stored in the respective files.</p></div>';
    } else if (result === 'reset') {
        document.getElementById('results').innerHTML = '<div class="result"><h2>Files Reset:</h2><p>All files have been reset.</p></div>';
    } else if (action) {
        if (action === 'armstrong') {
            fetchResults('armstrong.txt', 'Armstrong Numbers');
        } else if (action === 'fibonacci') {
            fetchResults('fibonacci.txt', 'Fibonacci Numbers');
        } else if (action === 'prime') {
            fetchResults('prime.txt', 'Prime Numbers');
        } else if (action === 'none') {
            fetchResults('none.txt', 'None of the Above Numbers');
        }
    }
}

//Load the navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
})
