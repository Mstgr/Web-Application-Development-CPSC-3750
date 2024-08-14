/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: master.js
*/
document.addEventListener('DOMContentLoaded', function () {
    fetch('get_users.php')
        .then(response => response.json())
        .then(data => {
            const userListContainer = document.getElementById('user-list');
            if (data.success) {
                const table = document.createElement('table');
                const headerRow = table.insertRow();
                headerRow.insertCell().textContent = 'Name';
                headerRow.insertCell().textContent = 'Email';
                headerRow.insertCell().textContent = 'Date Created';
                headerRow.insertCell().textContent = 'Last Login';
                headerRow.insertCell().textContent = 'Login Count';

                data.users.forEach(user => {
                    const row = table.insertRow();
                    row.insertCell().textContent = user.name;
                    row.insertCell().textContent = user.email;
                    row.insertCell().textContent = new Date(user.created_at).toLocaleString();
                    row.insertCell().textContent = user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never';
                    row.insertCell().textContent = user.login_count;
                });
                userListContainer.innerHTML = '';
                userListContainer.appendChild(table);
            } else {
                userListContainer.textContent = 'Error loading user list.';
            }
        })
        .catch(error => {
            console.error('Error loading user list:', error);
            const userListContainer = document.getElementById('user-list');
            userListContainer.textContent = 'Error loading user list.';
        });
});
