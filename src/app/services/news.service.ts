import { NewInterface, News } from './../ClassesAndInterfaces/New';
import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';

declare var require: any

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  async GetNewsFromDB(): Promise<News[]>{
    const pb = new PocketBase('http://127.0.0.1:8090');
    var news: News[] = [];
    
    const records = await pb.collection('News').getFullList({
      sort: '-created',
    });
    for (let i = 0; i < records.length; i++) {
      var singleNews: News = {model: records[i], url: pb.files.getUrl(records[i], records[i]['img'])};
      news.push(singleNews);
    }
    
    console.log(news);
    return news;
  }

  getNewsFromJSON(): NewInterface[]{
    const results = require('../ClassesAndInterfaces/news.json').items;
    var news: NewInterface[] = results.map((record: { [x: string]: any; }) => ({
      id: record['id'],
      title: record['title'],
      desc: record['desc'],
      date: new Date(record['date']),
      url: record['url']
    }));

    return news;
  }
}