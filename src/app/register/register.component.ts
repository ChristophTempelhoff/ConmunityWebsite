import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ELaender, Mitgliedsantraege } from '../mitgliedsantraege';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  pmk: boolean = false;
  wst: boolean = false;
  sus: boolean = false;
  tud: boolean = false;
  mb: boolean = false;


  mitgliedForm: FormGroup;
  isAnderesPronomen = false; 
  ELaender = ELaender;


  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.mitgliedForm = this.fb.group({
      antragsID: [''],
      o_vorname: ['', Validators.required],
      b_vorname: [''],
      nachname: ['', Validators.required],
      geburtsdatum: ['', Validators.required],
      pronomen: ['auswahl'],
      anderesPronomen: [''], 
      strasse: ['', Validators.required],
      hausnummer: ['', Validators.required],
      stiege: [''],
      tuer: [''],
      plz: ['', [Validators.required, Validators.pattern(/^\d{4,5}$/)]],
      ort: ['', Validators.required],
      land: ['AT', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      vw: ['+43'],
      telefon: ['', [Validators.required]],
      qualis: [''],
      newsletter: [false],
      eingelangt: [''],
// Bereiche
      pmk: [false],
      wst: [false],
      sus: [false],
      tud: [false],
      mb: [false]
    });
  }
  

  ngOnInit(): void {}
  
  onLandChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.mitgliedForm.get('land')?.setValue(selectedValue);
  }

  onPronomenChange() {
    const gewaeltesPronomen = this.mitgliedForm.get('pronomen')?.value;
    this.isAnderesPronomen = gewaeltesPronomen === 'andere';
    //Cleared das "anderesPronomen" Feld
    if (!this.isAnderesPronomen) {
      this.mitgliedForm.get('anderesPronomen')?.setValue('');
    }

  }
  getEnumKeys(enumObj: any): (keyof typeof ELaender)[] {
    return Object.keys(enumObj) as (keyof typeof ELaender)[];
  }

  
  submit() {
    if (this.mitgliedForm.valid) {
      const raw = this.mitgliedForm.value;

      const pronomenToSubmit = raw.pronomen === 'andere' ? raw.anderesPronomen : raw.pronomen;
      const telefonFin = raw.vw + raw.telefon;
      

      // Validierung und Verarbeitung der Eingabedaten
      const validInput = {
        antragsID: raw.antragsID ?? '',
        o_vorname: raw.o_vorname ?? '',
        b_vorname: raw.b_vorname ?? '',
        nachname: raw.nachname ?? '',
        geburtsdatum: raw.geburtsdatum ? new Date(raw.geburtsdatum) : new Date(),
        pronomen: pronomenToSubmit,
        strasse: raw.strasse ?? '',
        hausnummer: raw.hausnummer ?? '',
        stiege: raw.stiege ?? '',
        tuer: raw.tuer ?? '',
        plz: raw.plz ?? '',
        ort: raw.ort ?? '',
        land: raw.land,
        email: raw.email ?? '',
        telefon: telefonFin,
        qualis: raw.qualis ?? '',
        newsletter: raw.newsletter,
        eingelangt: raw.eingelangt ? new Date(raw.eingelangt) : new Date(), // bleibt als Date
        //Bereiche
        pmk: raw.pmk, // Convert boolean to 1/0
        wst: raw.wst,
        sus: raw.sus,
        tud: raw.tud,
        mb: raw.mb
      };

      // Erstellung des Antrags
      const antrag = new Mitgliedsantraege(validInput);

      // Daten an den API-Service senden
      this.dataService.create_antrag(antrag)
        .pipe(first())
        .subscribe(response => {
          // Erfolgreiche Verarbeitung (z.B. Umleitung zur Erfolgsmeldung oder Login)
          alert('Antrag erfolgreich erstellt!');
          this.router.navigate(['/success']);
        }, error => {
          console.error('Fehler beim Erstellen des Antrags', error);
        });
    } else {
      this.mitgliedForm.markAllAsTouched(); // Markiere alle Felder als berührt, um Validierungsfehler anzuzeigen
    }
  }
}
