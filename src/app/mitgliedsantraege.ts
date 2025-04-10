export enum ELaender {
   AT = "🇦🇹 Österreich",
   DE = "🇩🇪 Deutschland",
   CH = "🇨🇭 Schweiz",
   LI = "🇱🇮 Liechtenstein",
   LU = "🇱🇺 Luxemburg",
   BE = "🇧🇪 Belgien",
   IT = "🇮🇹 Italien"
}

interface MitgliedsantraegeProps {
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

export class Mitgliedsantraege {
   private props: Required<MitgliedsantraegeProps>;

   constructor(input: MitgliedsantraegeProps) {

      // Basic validation
      if (!input.email.includes("@")) {
         throw new Error("Ungültige E-Mail-Adresse");
      }

      if (!/^\d{4,5}$/.test(input.plz)) {
         throw new Error("Postleitzahl muss 4 oder 5 Ziffern enthalten");
      }

      // if (input.pronomen == "andere"){
      //    alert("Pronomen ist andere");
      // }

      // Set defaults
      this.props = {
         ...input,
         b_vorname: input.b_vorname ?? "",
         stiege: input.stiege ?? "",
         tuer: input.tuer ?? "",
         eingelangt: input.eingelangt ?? ""
      };
   }

   // Example getter methods
    getFullName(): string {
       const { o_vorname, b_vorname, nachname } = this.props;
      return `${o_vorname} ${b_vorname ? b_vorname + " " : ""}${nachname}`;
   }

    getAdresse(): string {
       const { strasse, hausnummer, stiege, tuer, plz, ort, land } = this.props;
       return `${strasse} ${hausnummer}${stiege ? "/" + stiege : ""}${tuer ? "/" + tuer : ""}, ${plz} ${ort}, ${land}`;
    }

    getEmail(): string {
       return this.props.email;
   }

    getProps(): MitgliedsantraegeProps {
       return this.props;
    }
}