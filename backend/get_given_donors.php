<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include 'db_connect.php';

$query = "SELECT Adhar, Name, Token_Status FROM donor WHERE Token_Status = 'Given'";
$result = $conn->query($query);

$donors = [];
while ($row = $result->fetch_assoc()) {
    $donors[] = $row;
}

echo json_encode($donors);
$conn->close();
?>
