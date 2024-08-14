/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: login.js
*/
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);

        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'search.html'; // Redirect to home page on successful login
            } else {
                loginMessage.textContent = data.message;
                loginMessage.style.color = 'red';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginMessage.textContent = 'An error occurred. Please try again.';
            loginMessage.style.color = 'red';
        });
    });
});
