<?php
include_once "db_connect.php";
include "newsClass.php";

$news = array();

$sql = "SELECT * FROM news ORDER BY created DESC;";
$result = $conn->query($sql);

if($result->num_rows > 0){
    while ($row = $result->fetch_assoc()) {
        $created = date_format(date_create($row["created"]),"Y-m-d");
        array_push($news, new News($row["newsID"], $row["title"], $row["introduction"], $row["description"],
        $created, $row["img"]));
    }
}

echo json_encode($news);
?>