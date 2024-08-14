
<!-- Common Navbar -->
<div id="navbar-placeholder"></div>

<!-- JavaScript code section -->
<script>
        document.addEventListener('DOMContentLoaded', function () {
            fetch('/navbar.html')
                .then(response => response.text())
                .then(html => {
                    document.getElementById('navbar-placeholder').innerHTML = html;
                })
                .catch(error => console.error('Error loading navbar.html', error));
        })
    </script>
<?php
    echo "Hello World";
?>