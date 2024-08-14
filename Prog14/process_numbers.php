<!--
    Name: Michael Steiger
    Date: July 13th 2024
    Prog14: PHP File I/O App
    File: process_numbers.php
-->
<?php
// Function to check if a number is prime
function is_prime($num){
    if ($num <= 1)
        return false;
    for ($i = 2; $i <= sqrt($num); $i++) {
        if ($num % $i == 0)
            return false;
    }
    return true;
}

// Function to check if a number is an Armstrong number
function is_armstrong($num){
    $sum = 0;
    $temp = $num;
    $totalDigits = strlen($num);
    while ($temp != 0) {
        $digit = $temp % 10;
        $sum += pow($digit, $totalDigits);
        $temp = intval($temp / 10);
    }
    return $sum == $num;
}

// Function to check if a number is a Fibonacci number
function is_fibonacci($num){
    $a = 0;
    $b = 1;
    while ($b < $num) {
        $temp = $b;
        $b = $a + $b;
        $a = $temp;
    }
    return $b == $num || $num == 0;
}

// Function to create the empty text files
function initialize_files(){
    file_put_contents('prime.txt', '');
    file_put_contents('armstrong.txt', '');
    file_put_contents('fibonacci.txt', '');
    file_put_contents('none.txt', '');
}

// Check if the user has visited before
if (!isset($_COOKIE['visited'])) {
    // Set the cookie to indicate the user has visited
    setcookie('visited', 'true', time() + (86400 * 30), "/");

    // Create the empty text files
    initialize_files();
}

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    if (isset($_POST['check'])) {
        $numbers = explode(',', $_POST['numbers']);
        // Loop through each number and check if it is prime, armstrong, fibonacci, or none
        foreach ($numbers as $number) {
            $number = trim($number);
            if (is_numeric($number)) {
                if (is_prime($number)) {
                    file_put_contents('prime.txt', $number . PHP_EOL, FILE_APPEND);
                } elseif (is_armstrong($number)) {
                    file_put_contents('armstrong.txt', $number . PHP_EOL, FILE_APPEND);
                } elseif (is_fibonacci($number)) {
                    file_put_contents('fibonacci.txt', $number . PHP_EOL, FILE_APPEND);
                } else {
                    file_put_contents('none.txt', $number . PHP_EOL, FILE_APPEND);
                }
            }
        }
        header("Location: index.html?result=checked");
        exit();
    }
}

// Check if the reset action has been requested
if (isset($_GET['reset'])){
    unlink('prime.txt');
    unlink('armstrong.txt');
    unlink('fibonacci.txt');
    unlink('none.txt');
    setcookie('visited', '', time() - 3600, "/");
    initialize_files();
    echo "Files have been reset.";
    exit();
}
?>