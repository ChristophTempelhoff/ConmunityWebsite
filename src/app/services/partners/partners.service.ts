import { Partner } from 'src/app/ClassesAndInterfaces/Partner';
import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor() { }

  async getPartnersFromDB(): Promise<Partner[]>{
    const pb = new PocketBase('https://backend.conmunity.at');
    var partners: Partner[] = [];
    
    const records = await pb.collection('partner').getFullList({
      sort: 'created',
    });
    for (let i = 0; i < records.length; i++) {
      var singlePartner: Partner = {PartnerID: records[i]['id'], PartnerName: records[i]['partner_name'], PartnerDesc: records[i]['partner_description'], PartnerURL: records[i]['partner_url'], PartnerImg: pb.files.getUrl(records[i], records[i]['partner_img'])};
      partners.push(singlePartner);
    }
    
    return partners;
  }
}
