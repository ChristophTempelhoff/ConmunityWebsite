import { Injectable } from '@angular/core';
import { NewInterface } from "../ClassesAndInterfaces/New";
import PocketBase, { RecordModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  async GetNews(): Promise<RecordModel[]>{
    const pb = new PocketBase('http://127.0.0.1:8090');
    var news: NewInterface[] = [];
    
    const records = await pb.collection('News').getFullList({
      sort: '-created',
    });
    console.log(records);
    return records;
  }
}