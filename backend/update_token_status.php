<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

include 'db_connect.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['aadhar'])) {
    echo json_encode(["success" => false, "message" => "Aadhar not provided"]);
    exit;
}

$aadhar = $data['aadhar'];

$query = "UPDATE donor SET Token_Status = 'Donated Blood' WHERE Adhar = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $aadhar);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Update failed"]);
}

$stmt->close();
$conn->close();
?>
