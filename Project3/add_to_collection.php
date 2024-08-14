<?php
// This file adds a country to the user's collection
// it communicates with the database and makes ncessary changes
session_start();

$response = array('success' => false);

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $country = $data['country'];

    // Database connection
    $servername = "31.22.7.45";
    $username = "steigerdev_msteige";
    $password = ",;&gX#i=F!];";
    $dbname = "steigerdev_myDatabase";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the country is already in the user's collection
    $checkSql = $conn->prepare("SELECT * FROM favorites WHERE user_id = ? AND country_name = ?");
    $checkSql->bind_param("is", $user_id, $country);
    $checkSql->execute();
    $result = $checkSql->get_result();

    if ($result->num_rows > 0) {
        $response['message'] = 'Country is already in your collection.';
    } else {
        // Add the country to the favorites table
        $sql = $conn->prepare("INSERT INTO favorites (user_id, country_name) VALUES (?, ?)");
        $sql->bind_param("is", $user_id, $country);

        if ($sql->execute()) {
            $response['success'] = true;
            $response['message'] = 'Country added to your collection.';
        } else {
            $response['message'] = 'Error adding country to collection.';
        }

        $sql->close();
    }

    $checkSql->close();
    $conn->close();
} else {
    $response['message'] = 'User not logged in.';
}

echo json_encode($response);
?>
