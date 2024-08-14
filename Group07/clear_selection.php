<!--
    Name: Michael Steiger
    Date: July 12th 2024
    Group07: Sessions
    File: clear_selection.php
-->
<!-- Clear the selected cars from the session and redirect to the car display page -->
<?php
session_start();
unset($_SESSION['selected_cars']);
header("Location: car_display.php");
exit();
?>