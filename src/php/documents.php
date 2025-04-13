<?php
include_once "db_connect.php";
include "documentsClass.php";

$sql = "SELECT * FROM documents ORDER BY created DESC;";

$documents = array();

$result = $conn->query($sql);
if($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {;
        $created = date_format(date_create($row["created"]), "Y-m-d");
        $update = $row["updated"];
        if($row["updated"] != null){
            $update = date_format(date_create($update), "Y-m-d");
        }

        $documentID = $row["documentID"];
        $name = $row["name"];
        $fileType = $row["fileType"];
        $url = $row["url"];

        array_push($documents, new Documents($documentID, $name, $fileType, $url, $created, $update));
    }
}

echo json_encode($documents);
?>