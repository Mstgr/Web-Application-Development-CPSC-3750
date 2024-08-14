<?php
// user_info.php
session_start();

$response = array('logged_in' => false);

if (isset($_SESSION['user_id']) && isset($_SESSION['user_name'])) {
    $response['logged_in'] = true;
    $response['user_name'] = $_SESSION['user_name'];
}

echo json_encode($response);
?>
