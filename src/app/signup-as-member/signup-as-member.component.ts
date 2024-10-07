import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-signup-as-member',
  templateUrl: './signup-as-member.component.html',
  styleUrls: ['./signup-as-member.component.css']
})
export class SignupAsMemberComponent {
  memberType: String = "temporäre Mitgliedschaft"
officialFirstname: String = "";
preferedFirstname: String = "";
lastname: String = "";
dob: String = "";
sex: Number = 0;
firstnameParent: String = "";
lastnameParent: String = "";
adress: String = "";
plz: String = "";
city: String = "";
tel: String = "";
email: String = "";
newsletter: Boolean = true;


public safeDOB(){
  var element: HTMLInputElement = document.getElementsByClassName('form-control')[3] as HTMLInputElement;
  this.dob = element.value;
  
}

setSex(num: Number){
  this.sex = num;
  console.log("HIT! " + num);
  
}

safeUser(){
  var elements: HTMLInputElement[] = [];
  for (let i = 0; i < document.getElementsByClassName('form-control').length; i++) {
    elements.push(document.getElementsByClassName('form-control')[i] as HTMLInputElement);
  }

  this.officialFirstname = elements[0].value;
  this.preferedFirstname = elements[1].value;
  this.lastname = elements[2].value;

  console.log("Offizieller Vorname: " + this.officialFirstname + ", Bevorzugter Vorname: " + this.preferedFirstname + ", Nachname: " + this.lastname + ", Geburtstag: " + this.dob + ", Geschlecht: " + this.sex);
}
}
