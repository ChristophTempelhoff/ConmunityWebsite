import { Component } from '@angular/core';
import { PartnersService } from '../services/partners/partners.service';
import { Partner } from '../ClassesAndInterfaces/Partner';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent {
PartnersTmp: Partner[] = [];
Partners: Partner[][] = [];
rowsToIterate: number[] = [];
  constructor(){
    this.initializePartners();
  }

  async initializePartners(){
    var ps: PartnersService = new PartnersService();
    this.PartnersTmp = await ps.getPartnersFromDB();
    var rows: number = Math.ceil(this.PartnersTmp.length / 3);
    
    for (let i = 0; i < rows; i++) {
      var partnersArr: Partner[] = [];
      partnersArr.push(this.PartnersTmp[0]);
      partnersArr.push(this.PartnersTmp[1]);
      partnersArr.push(this.PartnersTmp[2]);
      console.log("PartnersArr: ");
      console.log(partnersArr);
      
      

      this.Partners.push(partnersArr);
      console.log("Partners: ");
      console.log(this.Partners[i]);
      this.PartnersTmp.splice(0,3);
      this.rowsToIterate.push(i);
    }
    console.log(this.rowsToIterate);
    
  }
}