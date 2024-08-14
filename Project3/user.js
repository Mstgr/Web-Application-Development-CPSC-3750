/*
    Name: Michael Steiger
    Date: Aug 3rd 2024
    Project 3: Collection App Phase 2
    File: user.js
*/
document.addEventListener('DOMContentLoaded', function () {
    fetch('user_info.php')
        .then(response => response.json())
        .then(data => {
            const userContainer = document.getElementById('user-container');
            if (data.logged_in) {
                // Display the user's information
                userContainer.innerHTML = `
                    <h2>Login Information</h2>
                    <p>User: ${data.user_name}</p>
                    <button onclick="window.location.href='master_list.html'">Show Master List</button>
                    <button onclick="window.location.href='master.html'">Show Master User List</button>
                    <button id="logout-button">Logout</button>
                `;
                document.getElementById('view-collection-button').addEventListener('click', function () {
                    window.location.href = 'collection.html';
                });
                document.getElementById('logout-button').addEventListener('click', function () {
                    fetch('logout.php')
                        .then(() => {
                            window.location.href = 'index.html';
                        });
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
