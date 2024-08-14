<!--
    Name: Michael Steiger
    Date: July 25th 2024
    Prog15: Integrate with DB
    File: serch_person.html
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
    <!-- common navbar -->
    <div id="navbar-placeholder"></div>
    <div class="container">
        <h1>Search Results</h1>
        <?php
        if (isset($_GET['search_last_name'])) {

            include 'config.php';
            
            if (mysqli_connect_errno()) {
                printf("Connect failed: %s\n", mysqli_connect_error());
                exit();
            } else {
                // Escape user inputs for security (protect against sql injection)
                $search_last_name = mysqli_real_escape_string($mysqli, $_GET['search_last_name']);
                // Retrieve records
                $sql = "SELECT first_name, last_name, email FROM Person WHERE LOWER(last_name) = LOWER('$search_last_name')";
                $res = mysqli_query($mysqli, $sql);

                if ($res) {
                    // Display records
                    if (mysqli_num_rows($res) > 0) {
                        echo "<div class='results'>";
                        while ($row = mysqli_fetch_assoc($res)) {
                            echo "<p><strong>Name: </strong>" . $row['first_name'] . " " . $row['last_name'] . ", <strong>Email: </strong>" . $row['email'] . "</p>";
                        }
                        echo "</div>";
                    } else {
                        // No records found
                        echo "<p>No results found for '" . htmlspecialchars($search_last_name) . "'</p>";
                        echo "<p>Try searching for another last name.</p>";
                    }
                    mysqli_free_result($res);
                } else {
                    printf("Could not retrieve records: %s\n", mysqli_error($mysqli));
                }
                // Close connection
                mysqli_close($mysqli);
            }
        }
        ?>
        <a href="index.html"><button>Back to Search</button></a>
    </div>
    <script src="script.js"></script>
</body>
</html>