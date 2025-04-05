<?php
$servername = "localhost";
$username = "root";  // Change if needed
$password = "";  // Default is empty in XAMPP
$database = "blood donation";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
