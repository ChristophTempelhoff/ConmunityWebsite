<?php
$db_host = "mysqlsvr83.world4you.com";
$db_name = "1382394db1";
$db_username = "sql6564486";
$db_password = "sp+wcsrv";


$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Überprüfe die Verbindung
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}
?>