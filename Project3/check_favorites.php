<?php
// check_favorites.php
// This file checks if a country is in the user's collection
// It checks if the user already has that country in their collection
session_start();

$response = array('in_collection' => false);

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $country = $_GET['country'];

    // Database connection
    $servername = "31.22.7.45";
    $username = "steigerdev_msteige";
    $password = ",;&gX#i=F!];";
    $dbname = "steigerdev_myDatabase";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the country is in the user's collection
    $sql = $conn->prepare("SELECT * FROM favorites WHERE user_id = ? AND item_id = ?");
    $sql->bind_param("ii", $user_id, $country);
    $sql->execute();
    $result = $sql->get_result();

    if ($result->num_rows > 0) {
        $response['in_collection'] = true;
    }

    $sql->close();
    $conn->close();
}

echo json_encode($response);
?>