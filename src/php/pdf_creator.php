<?php

require_once("AntragStellerClass.php");
class pdf_creator
{

    /**
     * Creates a PDF containing all the user info for when people signed up.
     * @param antrag_steller $antragsteller The person who signed up
     * @param int $antragsnummer The id of the sign up
     * @return void
     */
    public function createAntragsPDF(antrag_steller $antragsteller, int $antragsnummer): void
    {
        $pdfName = "Mitgliedsantrag_" . $antragsnummer;
        $autor = "CONmunity e.V.";

        // Create the content of the Antrag
        $html = $this->createPDFHeader($antragsteller, $antragsnummer);
        $html = $this->insertLineBreaks($html, 3);
        $html .= $this->createPDFPersonalData($antragsteller);
        $html = $this->insertLineBreaks($html, 2);
        $html .= $this->createPDFDepartments($antragsteller->getBereiche());

      //  echo json_encode($antragsteller);
        $this->composePDF($html, $pdfName, true, $autor, "Antrag auf ordentliche Mitgliedschaft", '/antraege/');
    }

    /**
     * Creates the Header (a.k.a. Briefkopf) for the PDF
     * @param antrag_steller $recepient The person who is supposed to get the pdf 
     * @param int $antragsnummer The id of the Antrag
     * @return string the header represented in HTML
     */
    private function createPDFHeader(antrag_steller $recepient, int $antragsnummer): string
    {
        $antragsdatum = date("d.m.Y");

        $recepient_header = 'CONmunity - Verein für Musik, Tanz, Videospiele und moderne Jugend- und Popkultur
        Das Präsidium
        https://www.conmunity.at';

        $antragssteller_header = $recepient->getOVorname() . " ";

        if ($recepient->getBVorname() != null) {
            $antragssteller_header = $antragssteller_header . '"' . $recepient->getBVorname() . '" ';

        }

        $antragssteller_header = $antragssteller_header . $recepient->getNachname() . "\n";

        $antragssteller_header = $antragssteller_header . $recepient->getStrasse() . ' ' . $recepient->getHausnummer();

        if ($recepient->getStiege() != null) {
            $antragssteller_header = $antragssteller_header . '/' . $recepient->getStiege();
            if ($recepient->getTuer() != null) {
                $antragssteller_header = $antragssteller_header . '/' . $recepient->getTuer();
            }
        }

        $antragssteller_header = $antragssteller_header . "\n" . $recepient->getPlz() . " " . $recepient->getOrt();


        $header = '
        <table cellpadding="5" cellspacing="0" style="width: 100%">
        <tr>
        <td>' . nl2br(trim($recepient_header)) . '</td>
        <td style="text-align: right">
        Antragsnummer: ' . $antragsnummer . '<br>
        Antragsdatum: ' . $antragsdatum . '<br>
        </td>
        </tr>
        
        <tr>
        <td style="font-size:1.5em; font-weight: bold;">
        <br><br>
Antrag auf ordentliche Mitgliedschaft
        <br>
        </td>
        </tr>
        
        <tr>
        <td colspan="2">' . nl2br(trim($antragssteller_header)) . '</td>
        </tr>
        </table>';

        return $header;
    }

    /**
     * Creates the part for a PDF containing all the personal data of a person
     * @param antrag_steller $person The person whose data is supposed to be displayed
     * @return string The personal data in an html table
     */
    private function createPDFPersonalData(antrag_steller $person): string
    {
        $personalData = '
        <h3>Deine Daten</h3>
        <table cellpadding="5" cellspacing="0" style="width: 100%" border="1">
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Offizieller Vorname</b></td>
                <td>' . $person->getOVorname() . '</td>
            </tr>';

        if ($person->getBVorname() != null) {
            $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Bevorzugter Vorname</b></td>
                <td>' . $person->getBVorname() . '</td>
                </tr>';
        }
        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Nachname</b></td>
            <td>' . $person->getNachname() . '</td>
            </tr>';

        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Geboren am</b></td>
            <td>' . $person->getGeburtsdatum()->format("d.m.Y") . '</td>
            </tr>';
        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Pronomen</b></td>
            <td>' . $person->getPronomen() . '</td>
            </tr>';
        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Anschrift</b></td>
            <td>' . $person->getStrasse() . ' ' . $person->getHausnummer();
        if ($person->getStiege() != null) {
            $personalData .= '/' . $person->getStiege();
            if ($person->getTuer() != null) {
                $personalData .= '/' . $person->getTuer();
            }
        }
        $personalData .= ", " . $person->getPlz() . " " . $person->getOrt() . '</td>
            </tr>
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>E-Mail-Adresse</b></td>
                <td>' . $person->getEmail() . '</td>
            </tr>';

        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Telefonnummer</b></td>
            <td>' . $person->getTelefon() . '</td>
            </tr>';

        $personalData .= '<tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Qualifikationen</b></td>
                <td>' . $person->getQualis() . '</td>
            </tr>
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Möchtest du den Newsletter kriegen?</b></td>
                <td>';
        if ($person->getNewsletter()) {
            $personalData .= "Ja";
        } else {
            $personalData .= "Nein";
        }
        $personalData .= '</td>
            </tr>
        </table>';

        return $personalData;
    }

    /**
     * Creates the part for a PDF containing all the preferences regarding department-wishes
     * @param Bereiche $departments The departments to be displayed
     * @return string The preferences regarding departments in an html table
     */
    private function createPDFDepartments(Bereiche $departments): string
    {
        $bereicheContent = '        
        <h3>In welchen Bereichen möchtest du aktiv sein?</h3>
        
        <table cellpadding="5" cellspacing="0" style="width: 100%" border="1">
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Presse, Medien & Kommunikation</b></td>
                <td>';
        if ($departments->getPMK()) {
            $bereicheContent .= "Ja";
        } else {
            $bereicheContent .= "Nein";
        }
        $bereicheContent .= '</td>
            </tr>
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Workshops, Schulungen & Trainings</b></td>
                <td>';
        if ($departments->getWST()) {
            $bereicheContent .= "Ja";
        } else {
            $bereicheContent .= "Nein";
        }
        $bereicheContent .= '</td>
            </tr>
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Sanität und Sicherheit</b></td>
                <td>';
        if ($departments->getSUS()) {
            $bereicheContent .= "Ja";
        } else {
            $bereicheContent .= "Nein";
        }
        $bereicheContent .= '</td>
            </tr>
            <tr style="background-color: #cccccc; padding: 5px;">
                <td><b>Technik und Digitales</b></td>
                <td>';
        if ($departments->getTUD()) {
            $bereicheContent .= "Ja";
        } else {
            $bereicheContent .= "Nein";
        }
        $bereicheContent .= '</td>
            </tr>';

        $bereicheContent .= '<tr style="background-color: #cccccc; padding: 5px;">
            <td><b>Mitgliederbetreuung</b></td>
            <td>';
        if ($departments->getMB()) {
            $bereicheContent .= "Ja";
        } else {
            $bereicheContent .= "Nein";
        }
        $bereicheContent .= '</td>
            </tr>
            </table>';

        return $bereicheContent;
    }

    /**
     * Composes all given parameters to a .pdf file
     * @param string $content The content of the pdf. It must be formated in html
     * @param string $name The name of the file
     * @param bool $saveOnDisc Wether the file should be saved on disc or directly returend to the recepient via webbrowser
     * @param string $author The author of the pdf
     * @param string $title The title of the pdf
     * @param string $folderToSaveIn The folder on disc in which to safe the pdf
     * @return void
     */
    private function composePDF(string $content, string $name, bool $saveOnDisc, string $author, string $title, string $folderToSaveIn): void
    {
        require_once 'tcpdf/tcpdf.php';

        $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor($author);
        $pdf->SetTitle($title);
        $pdf->SetSubject($title);
        $pdf->setHeaderFont(array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
        $pdf->setFooterFont(array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

        $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

        $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
        $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
        $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);

        $pdf->SetAutoPageBreak(true, PDF_MARGIN_BOTTOM);
        $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
        $pdf->setFont('dejavusans', '', 10);
        $pdf->AddPage();

        $pdf->writeHTML($content, true, false, true, false, '');

        $dest = $saveOnDisc ? 'F' : 'I';

        $pdf->Output(dirname(__FILE__) . $folderToSaveIn . $name . '.pdf', $dest);
    }

    /**
     * Adds line breaks for html (< br >)
     * @param string $stringToAddTo Your string to which you want to add line breaks
     * @param int $amountOfLineBreaks The amount of line breaks to add
     * @return string Your string with the added line breaks
     */
    private function insertLineBreaks(string $stringToAddTo, int $amountOfLineBreaks = 1): string
    {
        $lineBreaks = '';
        for ($i = 0; $i <= $amountOfLineBreaks; $i++) {
            $lineBreaks .= '<br>';
        }
        return $stringToAddTo .= $lineBreaks;
    }
}
?>