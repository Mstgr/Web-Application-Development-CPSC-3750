/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: security_question.js
*/
document.addEventListener('DOMContentLoaded', function () {
    const securityQuestion = localStorage.getItem('security_question');
    document.getElementById('security-question').textContent = securityQuestion;
});

document.getElementById('security-question-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const securityAnswer = document.getElementById('security-answer').value;

    fetch('verify_security_answer.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ security_answer: securityAnswer })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'reset_password.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
