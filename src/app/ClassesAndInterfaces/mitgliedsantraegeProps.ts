export interface MitgliedsantraegeProps {
    antragsID: string;
    o_vorname: string;
    b_vorname?: string;  // optional
    nachname: string;
    geburtsdatum: Date;
    pronomen: string;
    strasse: string;
    hausnummer: string;
    stiege?: string;     // optional
    tuer?: string;       // optional
    plz: string;
    ort: string;
    land: string;
    email: string;
    telefon: string;
    qualis: string;
    newsletter: boolean;
    eingelangt: Date;
 
    pmk: boolean, // Bereiche
    wst: boolean,
    sus: boolean,
    tud: boolean,
    mb: boolean
 }