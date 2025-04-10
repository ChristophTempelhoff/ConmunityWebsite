<?php
require_once("bereiche.php");
include("db_connect.php");
 // Bereiche einfügen
// Überprüfen, ob das Formular abgesendet wurde


// Den Input-Stream lesen und in ein assoziatives Array dekodieren
$input = json_decode(file_get_contents('php://input'), true);

// Überprüfen, ob alle benötigten Felder vorhanden sind
if (isset($input['o_vorname'], $input['nachname'], $input['geburtsdatum'], $input['pronomen'], 
    $input['strasse'], $input['hausnummer'], $input['plz'], $input['ort'], $input['land'], 
    $input['email'], $input['telefon'], $input['qualis'], $input['newsletter'])) {

    $o_vorname = $input['o_vorname'];
    $b_vorname = isset($input['b_vorname']) ? $input['b_vorname'] : null;  // Optionales Feld
    $nachname = $input['nachname'];
    $geburtsdatum = $input['geburtsdatum'];
    $pronomen = $input['pronomen'];
    $strasse = $input['strasse'];
    $hausnummer = $input['hausnummer'];
    $stiege = isset($input['stiege']) ? $input['stiege'] : null;  // Optionales Feld
    $tuer = isset($input['tuer']) ? $input['tuer'] : null;  // Optionales Feld
    $plz = $input['plz'];
    $ort = $input['ort'];
    $land = $input['land'];
    $email = $input['email'];
    $telefon = $input['telefon'];
    $qualis = $input['qualis'];
    $newsletter = $input['newsletter'];

    // Stelle sicher, dass alle Felder validiert und korrekt sind
    if (empty($telefon)) {
        echo "Telefonnummer darf nicht leer sein.";
        exit;
    }

// Optional: Überprüfen, ob die bereicheID gültig ist

$checkBereicheID = $conn->prepare("SELECT COUNT(*) FROM bereiche");
$checkBereicheID->execute();

$checkBereicheID->bind_result($new_bereicheID);
$checkBereicheID->fetch();
$checkBereicheID->close();
if ($new_bereicheID == 0) {
    echo json_encode(["error" => "Ungültige bereicheID."]);
    exit;
}


    // Bereite die SQL-Anweisung vor
    $sql = "INSERT INTO mitgliedsantraege (o_vorname, b_vorname, nachname, geburtsdatum, pronomen, 
        strasse, hausnummer, stiege, tuer, plz, ort, land, email, telefon, qualis, bereicheID, newsletter)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    if ($stmt = $conn->prepare($sql)) {
        // Parameter binden
        $stmt->bind_param("sssssssssssssssss", $o_vorname, $b_vorname, $nachname, $geburtsdatum, 
            $pronomen, $strasse, $hausnummer, $stiege, $tuer, $plz, $ort, $land, $email, $telefon, $qualis, $new_bereicheID, $newsletter);

        // Ausführen der Abfrage
        if ($stmt->execute()) {
            echo json_encode(["message" => "Daten erfolgreich gespeichert."]);
        } else {
             echo json_encode(["error" => "Fehler beim Speichern der Daten: " . $stmt->error]);
        }
        // Schließe die vorbereitete Anweisung
        $stmt->close();
    } else {
        echo "Fehler bei der Vorbereitung der SQL-Anweisung: " . $conn->error;
    }
    
    // Schließe die Datenbankverbindung
    $conn->close();
} else {
    // Fehlende Eingabedaten
    echo "Fehlende Eingabedaten.";
    exit;
}

?>