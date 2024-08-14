<?php
// login.php
session_start(); // Start the session
include 'config.php';

// Get email and password from POST request
$email = trim($_POST['email']);
$password = trim($_POST['password']);

// Prepare and execute query
$sql = $conn->prepare("SELECT * FROM users WHERE email = ?");
$sql->bind_param("s", $email);
$sql->execute();
$result = $sql->get_result();

$response = array('success' => false, 'message' => 'Invalid email or password.');

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $hashedPassword = $user['password'];

    // Verify password
    if (password_verify($password, $hashedPassword)) {
        // Successful login
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $response['success'] = true;
        $response['message'] = 'Login successful.';

        // Update last login time and login count
        $updateSql = $conn->prepare("UPDATE users SET last_login_at = NOW(), login_count = login_count + 1 WHERE id = ?");
        $updateSql->bind_param("i", $user['id']);
        $updateSql->execute();
        $updateSql->close();
    }
}

$sql->close();
$conn->close();

echo json_encode($response);
?>
