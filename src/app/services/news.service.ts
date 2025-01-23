import { News } from './../ClassesAndInterfaces/New';
import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  protected pb = new PocketBase('https://backend.conmunity.at');

  constructor() { }

  async GetNewsFromDB(): Promise<News[]>{
    var news: News[] = [];
    
    const records = await this.pb.collection('News').getFullList({
      sort: '-created',
    });
    for (let i = 0; i < records.length; i++) {
      var singleNews: News = {
        id: records[i]['id'],
        title: records[i]['title'],
        desc: records[i]['desc'],
        introduction: records[i]['introduction'],
        date: new Date(records[i]['created']),
        ImageUrl: this.pb.files.getUrl(records[i], records[i]['img'])
      };
      news.push(singleNews);
    }
    return news;
  }

  async getSingleNewsFromDB(id: string): Promise<News>{
    let records = await this.pb.collection('News').getOne(id);
    return {id: records['id'], title: records['title'], desc: records['desc'], introduction: records['introduction'], date: new Date(records['created']), ImageUrl: this.pb.files.getUrl(records, records['img'])};
  }
}