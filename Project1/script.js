/*
    Name: Michael Steiger
    Date: July 13th 2024
    Project 1: Audio Changer
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

document.addEventListener('DOMContentLoaded', () => {
    // Set up variables
    const audio = document.getElementById('audioPlayer');
    const currentTimeDisplay = document.getElementById('current-time');
    const playPauseButton = document.getElementById('playPause');
    const rewindButton = document.getElementById('rewind');
    const forwardButton = document.getElementById('forward');
    const titlesContainer = document.getElementById('titles');
    const addTitleButton = document.getElementById('addTitle');
    const removeTitleButton = document.getElementById('removeTitle');

    // Set up titles (default)
    let titles = [
        { start: 0, title: 'Intro' },
        { start: 147, title: 'Half' },
        { start: 150, title: 'Chorus' },
        { start: 200, title: 'Best Part' },
        { start: 250, title: 'Special String' },
        { start: 280, title: 'Conclusion' }
    ];

    let currentSegment = null;
    let lastClickedTitleIndex = null;

    // Display titles
    function displayTitles() {
        titlesContainer.innerHTML = '';
        titles.forEach((item, index) => {
            const button = document.createElement('button');
            button.innerText = item.title;
            if (index === lastClickedTitleIndex) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                playSegment(index);
                if (lastClickedTitleIndex !== null) {
                    titlesContainer.children[lastClickedTitleIndex].classList.remove('active');
                }
                lastClickedTitleIndex = index;
                button.classList.add('active');
            });

            titlesContainer.appendChild(button);
        });
    }

    // Play segment
    function playSegment(index) {
        const start = titles[index].start;
        const end = titles[index + 1] ? titles[index + 1].start : audio.duration;
        audio.currentTime = start;
        currentSegment = { start, end };
        audio.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Update the play/pause button to show "Pause"
    }

    // Update current time display and check for end of segment
    function updateCurrentTime() {
        currentTimeDisplay.innerText = `Current Time: ${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)}`;
        if (currentSegment && audio.currentTime >= currentSegment.end) {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Update the play/pause button to show "Play"
        }
    }

    // Rewind and forward functions
    function rewind() {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
    }

    function forward() {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
    }

    // Play/pause toggle
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    // Add title
    function addTitle() {
        const title = prompt('Enter title:');
        if (title) {
            const newTitle = { start: audio.currentTime, title };
            titles.push(newTitle);
            titles.sort((a, b) => a.start - b.start);
            displayTitles();
        }
    }

    // Remove title
    function removeTitle() {
        if (lastClickedTitleIndex !== null) {
            titles.splice(lastClickedTitleIndex, 1);
            lastClickedTitleIndex = null;
        } else {
            // Remove the first title if no title has been clicked
            titles.shift();
        }
        displayTitles();
    }

    // Event listeners
    audio.addEventListener('timeupdate', updateCurrentTime);
    playPauseButton.addEventListener('click', togglePlayPause);
    rewindButton.addEventListener('click', rewind);
    forwardButton.addEventListener('click', forward);
    addTitleButton.addEventListener('click', addTitle);
    removeTitleButton.addEventListener('click', removeTitle);

    displayTitles();
});
