<!--
    Name: Michael Steiger
    Date: July 12th 2024
    Group07: Sessions
    File: car_selection.php
-->

<?php
session_start(); // start the session
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group07: Sessions</title>
    <style src="style.css"></style>
</head>

<body>
    <!-- Common Navbar -->
    <div id="navbar-placeholder"></div>

    <!-- Page heading -->
    <h1>Car Selection Page</h1>
    <p>by Michael Steiger</p>
    <p>Hold shift and use arrow keys to select multple cars</p>

    <!-- Form to select cars -->
    <form action="process_selection.php" method="post">
        <label for="cars">Select Cars:</label>
        <select id="cars" name="cars[]" multiple size="7">
            <option value="Porsche">Porsche</option>
            <option value="Ferrari">Ferrari</option>
            <option value="Opel">Opel</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Audi">Audi</option>
            <option value="Fiat">Fiat</option>
        </select>
        <br><br>
        <button type="submit">Submit</button>
    </form>
    <script src="script.js"></script>
</body>

</html>

