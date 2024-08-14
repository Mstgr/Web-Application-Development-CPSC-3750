/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: register.js
*/
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const registerMessage = document.getElementById('register-message');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(registerForm);
        fetch('register.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    registerMessage.textContent = data.message;
                    registerMessage.style.color = 'green';
                    setTimeout(() => {
                        window.location.href = 'index.html'; // Redirect to login page after successful registration
                    }, 2000);
                } else {
                    registerMessage.textContent = data.message;
                    registerMessage.style.color = 'red';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                registerMessage.textContent = 'An error occurred. Please try again.';
                registerMessage.style.color = 'red';
            });
    });
});
