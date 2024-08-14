/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: reset_password.js
*/
document.getElementById('reset-password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    fetch('reset_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password has been reset. You can now log in.');
            window.location.href = 'index.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
