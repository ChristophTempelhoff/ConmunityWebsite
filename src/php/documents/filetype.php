<?php
include "../db_connect.php";

$fileTypes = array();

$sql = "SELECT DISTINCT fileType FROM `documents`;";

$result = $conn->query($sql);

if($result->num_rows > 0){
    while($row = $result->fetch_assoc()){
        array_push($fileTypes, $row["fileType"]);
    }
}

echo json_encode($fileTypes);