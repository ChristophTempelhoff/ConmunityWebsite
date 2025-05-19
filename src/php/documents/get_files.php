<?php
include("../db_connect.php");


// Use $conn (not $mysqli), as defined in db_connect.php
$search = isset($_GET['search']) ? $conn->real_escape_string($_GET['search']) : '';
$type = isset($_GET['type']) ? $conn->real_escape_string($_GET['type']) : '';

// Build query
$query = "SELECT * FROM documents WHERE 1=1";
if (!empty($search)) {
    $query .= " AND name LIKE '%$search%'";
}
if (!empty($type)) {
    $query .= " AND fileType = '$type'";
}

$result = $conn->query($query);

$documents = [];
while ($row = $result->fetch_assoc()) {
    $documents[] = $row;
}

echo json_encode($documents);

// Close connection
$conn->close();
?>