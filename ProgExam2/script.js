// Event listener for the buttons
document.addEventListener('DOMContentLoaded', function () {
    fetch('words.php')
        .then(response => response.json())
        .then(data => {
            const buttonsDiv = document.getElementById('buttons');
            for (const count in data) {
                const button = document.createElement('button');
                button.textContent = count;
                button.addEventListener('click', () => showWords(data[count]));
                buttonsDiv.appendChild(button);
            }
        });

    // Event listener for the word list
    function showWords(words) {
        const wordListDiv = document.getElementById('word-list');
        wordListDiv.innerHTML = '';
        words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.textContent = word;
            wordItem.setAttribute('draggable', true);
            wordItem.addEventListener('dragstart', dragStart);
            wordListDiv.appendChild(wordItem);
        });
    }
    // Drag Event Functions inspired by the link provied in the instructions
    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.textContent);
    }
    // Event listener for the drop area
    const dropArea = document.getElementById('drop-area');
    dropArea.addEventListener('dragover', event => event.preventDefault());
    dropArea.addEventListener('drop', dropWord);

    let dropCount = 0;
    // Drop Event Functions
    function dropWord(event) {
        event.preventDefault();
        const word = event.dataTransfer.getData('text/plain');
        const droppedWord = document.createElement('div');
        droppedWord.textContent = word;
        dropArea.appendChild(droppedWord);
        dropCount++;
        document.getElementById('drop-count').textContent = dropCount;
    }
});

// Load the navbar
document.addEventListener('DOMContentLoaded', function () {
    fetch('/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-placeholder').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar.html', error));
});