/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: forgot_password.js
*/
document.getElementById('forgot-password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    console.log("Email submitted:", email);
    
    fetch('forgot_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('security_question', data.security_question);
            window.location.href = 'security_question.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
