<?php
include 'db_connect.php';  // Include database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $aadhar = $_POST['aadhar'];
    $age = $_POST['age'];
    $bloodGroup = $_POST['bloodGroup'];
    $bloodVolume = $_POST['bloodVolume'];
    $bmi = $_POST['bmi'];
    $dob = $_POST['dob'];
    $dateTime = $_POST['dateTime'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $height = $_POST['height'];
    $mobile = $_POST['mobile'];
    $token = $_POST['token'];
    $tokenStatus = $_POST['tokenStatus'];
    $weight = $_POST['weight'];
    $address = $_POST['address'];

    // SQL Query to insert data
    $sql = "INSERT INTO donor (Name, Adhar, Age, BloodG, Blood_volume, BMI, DOB, Date_Time, Email, Gender, Height, Mobile, Token, Token_Status, Weight, Address)
            VALUES ('$name', '$aadhar', '$age', '$bloodGroup', '$bloodVolume', '$bmi', '$dob', '$dateTime', '$email', '$gender', '$height', '$mobile', '$token', '$tokenStatus', '$weight', '$address')";

    if ($conn->query($sql) === TRUE) {
        echo "Record added successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();  // Close connection
}


// Example: validate Aadhar, Email, and Mobile
if (!preg_match("/^\d{12}$/", $_POST['aadhar'])) {
    die("Invalid Aadhar number.");
}

if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format.");
}

if (!preg_match("/^\d{10}$/", $_POST['mobile'])) {
    die("Invalid mobile number.");
}
echo "<script>alert('Donor record saved successfully!'); window.location.href='/blood_donation/frontend/AddDonor.html';</script>";


?>
