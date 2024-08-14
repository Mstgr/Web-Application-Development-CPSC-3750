<!--
    Name: Michael Steiger
    Date: July 12th 2024
    Group07: Sessions
    File: car_display.php
-->
<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Display Page</title>
    <style>
        /* Body element sets the font family and text alignment */
        body {
            font-family: Arial, sans-serif;
            text-align: center;
        }

        /* Container element sets the display and text alignment */
        .container {
            display: inline-block;
            text-align: left;
        }

        /* Car list element sets the text alignment and list style */
        .car-list {
            text-align: center;
            list-style-type: none;
            padding: 0;
        }

        /* Car list item element sets the display and margin */
        .car-list li {
            display: inline-block;
            margin: 5px;
        }

        /* Headings, paragraphs, links, and forms set the text alignment */
        h1,
        p,
        a,
        form {
            text-align: center;
        }
    </style>
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
</head>

<body>
    <!-- Common Navbar -->
    <div id="navbar-placeholder"></div>

    <div class="container">
        <h1>Car Display Page</h1>
        <p>by Michael Steiger</p>
        <!-- Display the selected cars in a list, and offer to clear the selection -->
        <?php
        if (isset($_SESSION['selected_cars']) && !empty($_SESSION['selected_cars'])) {
            echo "<h2>You have selected the following cars:</h2>";
            echo "<ul>";
            foreach ($_SESSION['selected_cars'] as $car) {
                echo "<li>" . htmlspecialchars($car) . "</li>";
            }
            echo "</ul>";
        } else {
            echo "<p>No cars selected.</p>";
        }
        ?>
        <form action="clear_selection.php" method="post">
            <button type="submit">Clear Selection</button>
        </form>
        <br>
        <a href="car_selection.php">Back to Car Selection Page</a>
    </div>
</body>

</html>