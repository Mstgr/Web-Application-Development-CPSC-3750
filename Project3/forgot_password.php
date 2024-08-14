<?php
// forgot_password.php
session_start();
include 'config.php'; // include database connection

// Parse JSON input
$data = json_decode(file_get_contents('php://input'), true);
$email = trim($data['email']); // Use trim to remove any extra spaces
error_log("Received email: " . $email); // Add this line for debugging

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

$sql = "SELECT security_question FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
if ($stmt === false) {
    error_log("Failed to prepare statement: " . $conn->error);
    echo json_encode(['success' => false, 'message' => 'Failed to prepare statement.']);
    exit();
}

$stmt->bind_param("s", $email);

// Log the final SQL query string with the parameter included
$final_sql = build_sql_string($sql, array($email));
error_log("Final SQL query: " . $final_sql); // Log the SQL query

$stmt->execute();
$result = $stmt->get_result();

$response = array('success' => false);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $_SESSION['reset_email'] = $email;
    $response['success'] = true;
    $response['security_question'] = $row['security_question'];
} else {
    error_log("Email not found: " . $email); // Add this line for debugging
    $response['message'] = 'Email not found.';
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>
