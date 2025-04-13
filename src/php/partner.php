<?php
include_once "db_connect.php";
include "partnerClass.php";

$partners = array();

$sql = "SELECT * FROM `partner` ORDER BY created DESC";
$result = $conn->query($sql);

if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $created = date_format(date_create($row["created"]),"Y-m-d");
        array_push($partners, new Partner($row["partnerID"], $row["name"], $row["description"], $row["img"],
        $row["url"], $created));
    }
}

echo json_encode($partners);
?>