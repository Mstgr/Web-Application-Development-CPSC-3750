<?php
// remove_from_collection.php
session_start();
include 'config.php';

$response = array('success' => false);

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $country = $data['country'];

    // Remove the country from the favorites table
    $sql = $conn->prepare("DELETE FROM favorites WHERE user_id = ? AND country_name = ?");
    $sql->bind_param("is", $user_id, $country);

    if ($sql->execute()) {
        $response['success'] = true;
        $response['message'] = 'Country removed from your collection.';
    } else {
        $response['message'] = 'Error removing country from collection.';
    }

    $sql->close();
    $conn->close();
} else {
    $response['message'] = 'User not logged in.';
}

echo json_encode($response);
?>
