<!-- 
    Name: Michael Steiger
    Date: July 12th 2024
    Group06: Forms
    File: form_processor.php
-->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Submission Results</title>
    <style src="style.css"></style>
</head>

<body>
    <!-- Common Navbar -->
    <div id="navbar-placeholder"></div>

    <h1>Form Submission Results</h1>
    <p>by Michael Steiger</p>

    <div class="form-result">
        <?php
        // Check if the form has been submitted
        if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['formSubmitted'])) {

            // Display the form submission results
            echo "<div><label>Text Input:</label> " . htmlspecialchars($_POST['text']) . "</div>";
            echo "<div><label>Textarea:</label> " . htmlspecialchars($_POST['textarea']) . "</div>";
            echo "<div><label>Hidden Data:</label> " . htmlspecialchars($_POST['hiddenData']) . "</div>";
            echo "<div><label>Password:</label> " . htmlspecialchars($_POST['password']) . "</div>";

            echo "<div><label>Check Boxes:</label><br>";
            if (!empty($_POST['checkbox'])) {
                foreach ($_POST['checkbox'] as $value) {
                    echo htmlspecialchars($value) . "<br>";
                }
            } else {
                echo "None selected";
            }
            echo "</div>";

            echo "<div><label>Radio Buttons:</label> " . htmlspecialchars($_POST['radio']) . "</div>";
            echo "<div><label>Selection List:</label> " . htmlspecialchars($_POST['select']) . "</div>";

            if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
                echo "<div><label>File Input:</label> " . htmlspecialchars(basename($_FILES['file']['name'])) . "</div>";
            } else {
                echo "<div><label>File Input:</label> No file uploaded or error occurred</div>";
            }

            echo "<div><label>URL Input:</label> " . htmlspecialchars($_POST['url']) . "</div>";

            // Display the "View Results" button
            echo '<form action="form_processor.php" method="post">';
            echo '<input type="hidden" name="viewResults" value="true">';
            echo '<button type="submit">View Results</button>';
            echo '</form>';
        } elseif (isset($_POST['viewResults'])) {

            // Display the form submission results when the "View Results" button is clicked
            echo "<div><label>Text Input:</label> " . htmlspecialchars($_POST['text']) . "</div>";
            echo "<div><label>Textarea:</label> " . htmlspecialchars($_POST['textarea']) . "</div>";
            echo "<div><label>Hidden Data:</label> " . htmlspecialchars($_POST['hiddenData']) . "</div>";
            echo "<div><label>Password:</label> " . htmlspecialchars($_POST['password']) . "</div>";

            echo "<div><label>Check Boxes:</label><br>";
            if (!empty($_POST['checkbox'])) {
                foreach ($_POST['checkbox'] as $value) {
                    echo htmlspecialchars($value) . "<br>";
                }
            } else {
                echo "None selected";
            }
            echo "</div>";

            echo "<div><label>Radio Buttons:</label> " . htmlspecialchars($_POST['radio']) . "</div>";
            echo "<div><label>Selection List:</label> " . htmlspecialchars($_POST['select']) . "</div>";

            if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
                echo "<div><label>File Input:</label> " . htmlspecialchars(basename($_FILES['file']['name'])) . "</div>";
            } else {
                echo "<div><label>File Input:</label> No file uploaded or error occurred</div>";
            }

            echo "<div><label>URL Input:</label> " . htmlspecialchars($_POST['url']) . "</div>";
        } else {

            // Display a message if no form data is submitted
            echo "<div>No form data submitted</div>";
        }
        ?>
    </div>
    <script src="srvc.js"></script>
</body>

</html>