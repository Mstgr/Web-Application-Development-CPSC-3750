<?php
// verify_security_answer.php
session_start();
include 'config.php'; // include database connection

// Parse JSON input
$data = json_decode(file_get_contents('php://input'), true);
$email = $_SESSION['reset_email'];
$security_answer = trim($data['security_answer']);

// Function to build the final SQL query string with bound parameters
function build_sql_string($query, $params) {
    $keys = array();
    $values = array();

    // This loop creates two arrays: one with the parameter placeholders (keys) and one with the actual parameter values
    foreach ($params as $key => $value) {
        $keys[] = '/\?/';
        $values[] = "'" . $value . "'";
    }
    // Replace each placeholder with the actual value
    return preg_replace($keys, $values, $query, 1);
}

$sql = "SELECT id FROM users WHERE email = ? AND security_answer = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    echo json_encode(['success' => false, 'message' => 'Failed to prepare statement.']);
    exit();
}

$stmt->bind_param("ss", $email, $security_answer);

// Log the final SQL query string with the parameters included
$final_sql = build_sql_string($sql, array($email, $security_answer));

$stmt->execute();
$result = $stmt->get_result();

$response = array('success' => false);

if ($result->num_rows > 0) {
    $_SESSION['verified'] = true;
    $response['success'] = true;
} else {
    $response['message'] = 'Incorrect answer.';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
