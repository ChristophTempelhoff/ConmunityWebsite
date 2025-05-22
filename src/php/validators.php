<?php

class Validator {
    private $data;
    private $errors = [];

    public function __construct(array $data) {
        $this->data = $data;
    }

    public function validate(): bool {
        $this->validateVorname();
        $this->validateNachname();
        $this->validateEmail();
        $this->validateTelefon();
        $this->validateGeburtsdatum();
        $this->validateLand();

        return empty($this->errors);
    }

    public function getErrors(): array {
        return $this->errors;
    }

    private function validateVorname() {
        $value = trim($this->data['o_vorname'] ?? '');
        if (empty($value) || strlen($value) < 2 || !preg_match("/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/", $value)) {
            $this->errors['o_vorname'] = 'Ungültiger Vorname';
        }
    }

    private function validateNachname() {
        $value = trim($this->data['nachname'] ?? '');
        if (empty($value) || strlen($value) < 2 || !preg_match("/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/", $value)) {
            $this->errors['nachname'] = 'Ungültiger Nachname';
        }
    }

    private function validateEmail() {
        $value = trim($this->data['email'] ?? '');
        if (empty($value) || !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $this->errors['email'] = 'Ungültige E-Mail-Adresse';
        }
    }

    private function validateTelefon() {
        $value = trim($this->data['telefon'] ?? '');
        if (empty($value) || !preg_match("/^\+?\d{6,15}$/", $value)) {
            $this->errors['telefon'] = 'Ungültige Telefonnummer';
        }
    }

    private function validateGeburtsdatum() {
        $value = $this->data['geburtsdatum'] ?? '';
    if (empty($value)) {
        $this->errors['geburtsdatum'] = 'Ungültiges Geburtsdatum';
        return;
    }

    $birthDate = new DateTime($value);
    $today = new DateTime();

    $age = $today->diff($birthDate)->y;

    if ($age < 18) {
        $this->errors['geburtsdatum'] = 'Du musst mindestens 18 Jahre alt sein.';
    }

    // Optional: Früheste erlaubte Eingabe z. B. 01.01.1900 prüfen
    $minDate = new DateTime('1900-01-01');
    if ($birthDate < $minDate || $birthDate > $today) {
        $this->errors['geburtsdatum'] = 'Geburtsdatum liegt außerhalb des gültigen Bereichs.';
    }
    }

    //Bei Änderung auch Elaender.ts anpassen
   private const ERLAUBTE_LAENDER = ['AT', 'DE', 'CH', 'LI', 'LU', 'BE', 'IT'];

    private function validateLand() {
    $value = strtoupper(trim($this->data['land'] ?? ''));

    if (!in_array($value, self::ERLAUBTE_LAENDER, true)) {
        $this->errors['land'] = 'Ungültiges Land ausgewählt.';
    }
    }

    // Du kannst hier beliebig weitere private validateXYZ() Methoden ergänzen
}