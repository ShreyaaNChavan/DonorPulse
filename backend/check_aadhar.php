<?php
include 'db_connect.php';

// Enable error reporting (for debugging — remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["error" => "Invalid request method"]);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['aadhar'])) {
    echo json_encode(["error" => "Aadhar not provided"]);
    exit;
}

$aadhar = trim($data['aadhar']);

// Prepare query
$query = "SELECT * FROM donor WHERE Adhar = ?";
$stmt = $conn->prepare($query);

if (!$stmt) {
    echo json_encode(["error" => "SQL prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("s", $aadhar);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    $lastDonation = $row['Date_Time'] ?? null;

    echo json_encode([
        "exists" => true,
        "lastDonationDate" => $lastDonation,
        "donorData" => $row
    ]);
} else {
    echo json_encode(["exists" => false]);
}

$stmt->close();
$conn->close();
?>
