<!--
    Name: Michael Steiger
    Date: July 18th 2024
    Group08: Zipcode Distance
    File: calculate_distance.php
-->
<?php

// Function to calculate the distance between two zip codes using the Haversine formula
function haversine($lat1, $lon1, $lat2, $lon2) {
    // Radius of Earth in kilometers
    $earth_radius = 6371; 
    // Convert degrees to radians
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    // Haversine formula
    $a = sin($dLat / 2) * sin($dLat / 2) +
         cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
         sin($dLon / 2) * sin($dLon / 2);
    // 2 * R 
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

    // Distance in kilometers
    return $earth_radius * $c;
}

// Function to read the csv file
function readZipData($filename) {
    return array_map('str_getcsv', file($filename));
}

// Function to find a zip code in the csv file
function findZipCode($zipData, $zipCode) {
    foreach ($zipData as $row) {
        if ($row[0] == $zipCode) {
            return $row;
        }
    }
    return null;
}
// Function to calculate the distance between two zip codes and return relevant information
function getDistanceBetweenZipCodes($zipData, $zip1, $zip2, &$loc1, &$loc2) {
    $loc1 = findZipCode($zipData, $zip1);
    $loc2 = findZipCode($zipData, $zip2);

    if ($loc1 && $loc2) {
        $lat1 = $loc1[1];
        $lon1 = $loc1[2];
        $lat2 = $loc2[1];
        $lon2 = $loc2[2];

        return haversine($lat1, $lon1, $lat2, $lon2);
    }
    return null;
}

// Function to convert kilometers to miles
function kilometersToMiles($kilometers) {
    $miles = $kilometers * 0.621371;
    return $miles;
}

// Ensure this file is only run when the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $zip1 = $_POST['zip1'];
    $zip2 = $_POST['zip2'];

    // fetch data from csv and calculate distance
    $zipData = readZipData('uszips.csv');
    $distance = getDistanceBetweenZipCodes($zipData, $zip1, $zip2, $loc1, $loc2);
    $distanceInMiles = kilometersToMiles($distance);
    

    // display results
    echo '<link rel="stylesheet" type="text/css" href="styles.css">';
    echo '<div id="navbar-placeholder"></div>';
    echo '<div class="container">';
    echo '<h2>Results</h2>';
    echo '<div class="results">';
    if ($distance) {
        echo "<p>Zipcode 1: {$loc1[0]}, City: {$loc1[3]}, State: {$loc1[4]}</p>";
        echo "<p>Zipcode 2: {$loc2[0]}, City: {$loc2[3]}, State: {$loc2[4]}</p>";
        echo "<p>Lat1: {$loc1[1]}, Lon1: {$loc1[2]}</p>";
        echo "<p>Lat2: {$loc2[1]}, Lon2: {$loc2[2]}</p>";
        echo "<p>Distance between $zip1 and $zip2 is: <strong>$distance</strong> km</p>";
        echo "<p>Distance between $zip1 and $zip2 is: <strong>$distanceInMiles</strong> miles</p>";
    } else {
        echo "<p>One or both zip codes not found.</p>";
    }
    echo '<form action="index.html" method="GET">';
    echo '<button type="submit">Calculate New Distance</button>';
    echo '</form>';
    echo '</div>';
    echo '</div>';
    echo '<script src="script.js"></script>';
}
?>
