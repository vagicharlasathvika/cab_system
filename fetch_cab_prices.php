<?php
// Database connection details
$host = 'localhost';
$username = 'root';
$password = "123";
$database = 'cab';

// Create a connection
$conn = mysqli_connect($host, $username, $password, $database);

// Check the connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Fetch cab prices from the database
$query = "SELECT * FROM cab_details";
$result = mysqli_query($conn, $query);

$cabs = [];
while ($row = mysqli_fetch_assoc($result)) {
    $cabs[] = $row;
}

// Close the connection
mysqli_close($conn);

// Return cab prices as JSON
header('Content-Type: application/json');
echo json_encode(['cabs' => $cabs]);
?>
