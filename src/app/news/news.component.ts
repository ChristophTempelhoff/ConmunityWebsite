import { Component, OnInit } from '@angular/core';
import { NewInterface } from "../ClassesAndInterfaces/New";
import { NewsService } from '../services/news.service';
import { RecordModel } from 'pocketbase';

declare var require: any

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  news: NewInterface[] = [];

  constructor() {
    this.initializeNews();
  }

  async initializeNews() {
    // Please be nice to me, I'm proud of that. 
    this.news = this.getNewsFromJSON();
    this.news = await this.getNews();
  }

  async getNews(): Promise<NewInterface[]> {
    var ns: NewsService = new NewsService();
    const records: RecordModel[] = await ns.GetNewsFromDB();
    // Remapping the database request to NewInterface[]
    const news: NewInterface[] = records.map(record => ({
      id: record['id'],
      title: record['title'],
      desc: record['desc'],
      date: new Date(record['created']),
      url: record['img']
    }));
    return news;
  }

  getNewsFromJSON(): NewInterface[]{
    var ns: NewsService = new NewsService();
    return ns.getNewsFromJSON();
  }
}