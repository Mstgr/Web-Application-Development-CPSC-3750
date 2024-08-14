<?php
// register.php

include 'config.php';

// Get user details from POST request
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password
$security_question = $_POST['security_question'];
$security_answer = $_POST['security_answer'];

// Prepare and execute query
$sql = $conn->prepare("INSERT INTO users (name, email, password, security_question, security_answer) VALUES (?, ?, ?, ?, ?)");
$sql->bind_param("sssss", $name, $email, $password, $security_question, $security_answer);

$response = array('success' => false, 'message' => 'Registration failed.');

if ($sql->execute()) {
    $response['success'] = true;
    $response['message'] = 'Registration successful. Redirecting to login...';
}

$sql->close();
$conn->close();

echo json_encode($response);
?>