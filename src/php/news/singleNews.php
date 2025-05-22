<?php
include_once("../db_connect.php");
include("../newsClass.php");


$newsID = $_GET['newsID'] ?? null;
if ($newsID != null) {
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
?>