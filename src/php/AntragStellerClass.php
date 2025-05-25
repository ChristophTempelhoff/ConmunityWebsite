<?php
require_once("BereicheClass.php");
final class antrag_steller
{
    //Antragsteller
    private string $o_vorname;
    private string $b_vorname;
    private string $nachname;
    private DateTime $geburtsdatum;
    private string $pronomen;
    private string $strasse;
    private string $hausnummer;
    private string | null $stiege;
    private string | null $tuer;
    private string $plz;
    private string $ort;
    private string $land;
    private string $email;
    private string $telefon;
    private string $qualis;
    private bool $newsletter;

    private Bereiche $bereiche;

    public function __construct($antragsteller) {
        $this->o_vorname = $antragsteller["o_vorname"];
        $this->b_vorname = $antragsteller["b_vorname"];
        $this->nachname = $antragsteller["nachname"];
        $this->geburtsdatum = date_create($antragsteller["geburtsdatum"]);
        $this->pronomen = $antragsteller["pronomen"];
        $this->strasse = $antragsteller["strasse"];
        $this->hausnummer = $antragsteller["hausnummer"];
        $this->stiege = $antragsteller["stiege"];
        $this->tuer = $antragsteller["tuer"];
        $this->plz = $antragsteller["plz"];
        $this->ort = $antragsteller["ort"];
        $this->land = $antragsteller["land"];
        $this->email = $antragsteller["email"];
        $this->telefon = $antragsteller["telefon"];
        $this->qualis = $antragsteller["qualis"];
        $this->newsletter = $antragsteller["newsletter"];
        $this->bereiche = new Bereiche($antragsteller);
    }

    public function getOVorname(): string
    {
        return $this->o_vorname;
    }

    public function getNachname(): string
    {
        return $this->nachname;
    }

    public function getGeburtsdatum(): DateTime
    {
        return $this->geburtsdatum;
    }

    public function getPronomen(): string
    {
        return $this->pronomen;
    }

    public function getStrasse(): string
    {
        return $this->strasse;
    }

    public function getHausnummer(): string
    {
        return $this->hausnummer;
    }

    public function getStiege(): ?string
    {
        return $this->stiege;
    }

    public function getTuer(): ?string
    {
        return $this->tuer;
    }

    public function getPlz(): string
    {
        return $this->plz;
    }

    public function getOrt(): string
    {
        return $this->ort;
    }

    public function getLand(): string
    {
        return $this->land;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getTelefon(): string
    {
        return $this->telefon;
    }

    public function getQualis(): string
    {
        return $this->qualis;
    }

    public function getNewsletter(): bool
    {
        return $this->newsletter;
    }

    public function getBVorname(): string{
        return $this->b_vorname ? $this->b_vorname : "";
    }

    public function getBereiche(): Bereiche {
        return $this->bereiche;
    }


}
?>