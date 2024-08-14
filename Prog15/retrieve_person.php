
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prog15: Integrate with DB</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="navbar-placeholder"></div>
    <div class="container">
        <h1>People List</h1>
        <p>Sorted by Last Name</p>
        <?php
        include 'config.php';
        
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        } else {
            // Prepare a select statement
            $sql = "SELECT * FROM Person ORDER BY last_name";
            $res = mysqli_query($mysqli, $sql);
            // Check if any rows were returned
            if ($res) {
                echo "<div class='results'>";
                // Print the rows
                while ($row = mysqli_fetch_assoc($res)) {
                    echo "<p><strong>Name:</strong> " . $row['first_name'] . " " . $row['last_name'] . ", <strong>Email:</strong> " . $row['email'] . "</p>";
                }
                echo "</div>";
                mysqli_free_result($res);

            } else {
                // If no rows were returned, print an error message
                printf("Could not retrieve records: %s\n", mysqli_error($mysqli));
            }
            // Close connection
            mysqli_close($mysqli);
        }
        ?>
        <!-- Back to Home -->
        <a href="index.html"><button>Back to Home</button></a>
    </div>
    <script src="script.js"></script>
</body>

</html>