<!--
    Name: Michael Steiger
    Date: July 25th 2024
    Prog15: Integrate with DB
    File: insert_person.html
-->
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
        <h1>Insert Person Result</h1>
        <?php
        include 'config.php';
        
        if (mysqli_connect_errno()) {
            printf("Connect failed: %s\n", mysqli_connect_error());
            exit();
        } else {
            if (isset($_POST['first_name'], $_POST['last_name'], $_POST['email'])) {
                $first_name = $_POST['first_name'];
                $last_name = $_POST['last_name'];
                $email = $_POST['email'];

                // Prepare an insert statement
                $stmt = $mysqli->prepare("INSERT INTO Person (first_name, last_name, email) VALUES (?, ?, ?)");
                if ($stmt) {
                    // Bind variables to the prepared statement as parameters
                    $stmt->bind_param("sss", $first_name, $last_name, $email);

                    // Execute the statement
                    if ($stmt->execute()) {
                        echo "<p>New person added successfully.</p>";
                    } else {
                        printf("Could not add person: %s\n", $stmt->error);
                    }

                    // Close the statement
                    $stmt->close();
                } else {
                    printf("Prepare statement failed: %s\n", $mysqli->error);
                }
            }
            // Close the connection
            mysqli_close($mysqli);
        }
        ?>
        <a href="index.html"><button>Back to Home</button></a>
    </div>
    <script src="script.js"></script>
</body>

</html>