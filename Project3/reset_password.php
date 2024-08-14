<?php
// reset_password.php
session_start();
include 'config.php'; // include database connection

if (isset($_SESSION['verified']) && $_SESSION['verified'] === true) {
    $email = $_SESSION['reset_email'];
    $data = json_decode(file_get_contents('php://input'), true);
    $new_password = password_hash($data['new_password'], PASSWORD_BCRYPT);

    $sql = "UPDATE users SET `password` = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Failed to prepare statement.']);
        exit();
    }
    $stmt->bind_param("ss", $new_password, $email);

    // Execute the statement
    if ($stmt->execute()) {
        $response = array('success' => true);
    } else {
        $response = array('success' => false, 'message' => 'Failed to execute statement.');
    }

    $stmt->close();
    $conn->close();

    session_destroy(); // Destroy the session after password reset
} else {
    $response = array('success' => false, 'message' => 'Unauthorized access.');
}

echo json_encode($response);
?>
