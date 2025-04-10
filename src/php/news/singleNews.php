<?php
include_once("../db_connect.php");
include("../newsClass.php");


$newsID = explode("/", getenv('REQUEST_URI'))[4];
if (isset($newsID)) {
    $sql = "SELECT * FROM news WHERE newsID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $newsID);
    $stmt->execute();
    $stmt->bind_result($newsID, $title, $introduction, $description, $created, $img);
    $stmt->fetch();
    $stmt->close();
    $singleNew = new News($newsID, $title, $introduction, $description, $created, $img);
    echo json_encode($singleNew);
}
