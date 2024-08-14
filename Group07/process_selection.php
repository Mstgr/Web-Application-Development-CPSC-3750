<!--
    Name: Michael Steiger
    Date: July 12th 2024
    Group07: Sessions
    File: process_selection.php
-->
<?php
// Process the selected cars from the form and store them in a session variable
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['cars']) && !empty($_POST['cars'])) {
        $_SESSION['selected_cars'] = $_POST['cars'];
    } else {
        $_SESSION['selected_cars'] = [];
    }
    header("Location: car_display.php");
    exit();
}
?>
