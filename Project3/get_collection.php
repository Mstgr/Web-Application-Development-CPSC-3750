<?php
// get_collection.php
session_start();
include 'config.php';

$response = array('success' => false);

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $sql = $conn->prepare("SELECT country_name, added_at FROM favorites WHERE user_id = ?");
    $sql->bind_param("i", $user_id);
    $sql->execute();
    $result = $sql->get_result();

    $countries = array();
    while ($row = $result->fetch_assoc()) {
        $countries[] = array(
            'country_name' => $row['country_name'],
            'added_at' => $row['added_at']
        );
    }

    $response['success'] = true;
    $response['countries'] = $countries;

    $sql->close();
    $conn->close();
} else {
    $response['message'] = 'User not logged in.';
}

echo json_encode($response);
?>
