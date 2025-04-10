<?php
include_once("db_connect.php");

// Überprüfen, ob das Formular abgesendet wurde

// Den Input-Stream lesen und in ein assoziatives Array dekodieren

$input = json_decode(file_get_contents('php://input'), true);

// Überprüfen, ob die benötigten Felder vorhanden sind

if (isset($input['pmk'], $input['wst'], $input['sus'], $input['tud'], $input['mb'])) {
    // Werte aus dem Input-Array abrufen

    $pmk = $input['pmk'] ? 1 : 0; // TRUE/FALSE in 1/0 umwandeln
    $wst = $input['wst'] ? 1 : 0;
    $sus = $input['sus'] ? 1 : 0;
    $tud = $input['tud'] ? 1 : 0;
    $mb = $input['mb'] ? 1 : 0;

    // Bereite die SQL-Anweisung vor
    $sql = "INSERT INTO bereiche (pmk, wst, sus, tud, mb) VALUES (?, ?, ?, ?, ?)";
    if ($stmt = $conn->prepare($sql)) {
        // Parameter binden
        $stmt->bind_param("iiiii", $pmk, $wst, $sus, $tud, $mb);
        // Ausführen der Abfrage
        if ($stmt->execute()) {
           // echo json_encode(["message" => "Daten erfolgreich gespeichert."]);
        } else {
            echo json_encode(["error" => "Fehler beim Speichern der Daten: " . $stmt->error]);
        }

        // Schließe die vorbereitete Anweisung
        $stmt->close();
    } else {
        echo json_encode(["error" => "Fehler bei der Vorbereitung der SQL-Anweisung: " . $conn->error]);
    }

    // Schließe die Datenbankverbindung
    $conn->close();
} else {

    // Fehlende Eingabedaten
    echo json_encode(["error" => "Fehlende Eingabedaten."]);
    exit;
}

?>