import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../services/register/register.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {  Mitgliedsantraege } from '../ClassesAndInterfaces/mitgliedsantraege';
import { ELaender } from '../ClassesAndInterfaces/ELaender';

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


  constructor(private fb: FormBuilder, private dataService: RegisterService, private router: Router) {
    this.mitgliedForm = this.fb.group({
      antragsID: [''],
      o_vorname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/)]],
      b_vorname: ['', [Validators.minLength(2), Validators.pattern(/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/)]],  //Optional
      nachname: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/)]],
      geburtsdatum: ['', [Validators.required, this.minAgeValidator(18) ,this.AgeValidator()] ],
      pronomen: ['', Validators.required],
      anderesPronomen: this.fb.control({ value: '', disabled: false }, { validators: [], updateOn: 'blur' }),
      strasse: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?=.*[a-zA-Z])([A-Za-zäöüßÄÖÜ\s.,'-]+(?:\s+(?:[A-Za-zäöüßÄÖÜ]+))*)?$/)]],
      hausnummer: ['', [Validators.required, Validators.pattern(/^\d{1,5}([a-zA-Z]|\s*[-]\s*\d{1,5}|\s*[a-zA-Z])?$/)]],
      stiege: ['', Validators.pattern(/^\d{1,5}([a-zA-Z]|\s*[a-zA-Z])?$/)],
      tuer: ['', Validators.pattern(/^\d{1,5}([a-zA-Z]|\s*[a-zA-Z])?$/)],
      plz: ['', [Validators.required, Validators.pattern(/^(?:\d{5}|\d{4})$/)]],
      ort: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^(?![ -])[A-ZÄÖÜ][A-Za-zÄÖÜäöüß\- ]*$/)]],
      land: ['AT'],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/)]],
      vw: ['+43'],
      telefon: ['', [Validators.required, Validators.pattern(/^\d{6,15}$/)]],
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
  
  AgeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
      const earliestValidDate = new Date('1900-01-01');
  
      if (isNaN(inputDate.getTime())) {
        return { invalidDate: true };
      }
  
      if (inputDate < earliestValidDate || inputDate > today) {
        return { invalidDate: true };
      }
  
      return null;
    };
  }

  minAgeValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
  
      if (isNaN(inputDate.getTime())) {
        return null; // Wird durch den anderen Validator abgefangen
      }
  
      const age = today.getFullYear() - inputDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > inputDate.getMonth() ||
        (today.getMonth() === inputDate.getMonth() && today.getDate() >= inputDate.getDate());
  
      const exactAge = hasHadBirthdayThisYear ? age : age - 1;
  
      return exactAge >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: exactAge } };
    };
  }
  onLandChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.mitgliedForm.get('land')?.setValue(selectedValue);
  }

  // onPronomenChange() {
  //   const gewaeltesPronomen = this.mitgliedForm.get('pronomen')?.value;
  //   this.isAnderesPronomen = gewaeltesPronomen === 'andere';
  //   //Cleared das "anderesPronomen" Feld
  //   if (!this.isAnderesPronomen) {
  //     this.mitgliedForm.get('anderesPronomen')?.setValue('');
  //   }

  // }

  onPronomenChange(): void {
    const selected = this.mitgliedForm.get('pronomen')?.value;
    this.isAnderesPronomen = selected === 'andere';
  
    const anderesPronomenControl = this.mitgliedForm.get('anderesPronomen');
  
    if (this.isAnderesPronomen) {
      anderesPronomenControl?.setValidators([Validators.required]);
    } else {
      anderesPronomenControl?.clearValidators();
      anderesPronomenControl?.setValue('');
    }
  
    anderesPronomenControl?.updateValueAndValidity({ onlySelf: true });
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
