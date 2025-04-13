import { Component, inject } from '@angular/core';
import { PartnersService } from '../services/partners/partners.service';
import { Partner } from '../ClassesAndInterfaces/Partner';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css', './sponsors.css']
})
export class PartnerComponent {
PartnersTmp: Partner[] = [];
Partners: Partner[][] = [];

isLoading: boolean = true; // Loading state

rowsToIterate: number[] = [];
  constructor(){
    this.initializePartners();
  }

  async initializePartners(){
    var ps: PartnersService = new PartnersService(inject(HttpClient));
    ps.getPartnersFromDB().subscribe((partners) => {
      this.PartnersTmp = partners;
      var rows: number = Math.ceil(this.PartnersTmp.length / 3);
  
      this.isLoading = false; // Set loading to false after loading
      
      for (let i = 0; i < rows; i++) {
        var partnersArr: Partner[] = [];
        partnersArr.push(this.PartnersTmp[0]);
        partnersArr.push(this.PartnersTmp[1]);
        partnersArr.push(this.PartnersTmp[2]);
      
        
  
        this.Partners.push(partnersArr);
       
        this.PartnersTmp.splice(0,3);
        this.rowsToIterate.push(i);
      }
    });

    
  }
}