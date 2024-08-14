<?php
// get_master_list.php
session_start();
include 'config.php';

$response = array('success' => false);

$sql = "SELECT name, email, created_at, last_login_at, login_count, failed_attempts FROM users";
$result = $conn->query($sql);

$users = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    $response['success'] = true;
    $response['users'] = $users;
} else {
    $response['message'] = 'No users found.';
}

$conn->close();

echo json_encode($response);
?>
