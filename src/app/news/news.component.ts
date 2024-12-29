import { Component, OnInit } from '@angular/core';
import { NewInterface, News } from "../ClassesAndInterfaces/New";
import { NewsService } from '../services/news.service';
import PocketBase, {RecordModel} from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  private NewsTmp: NewInterface[] = [];
  News: NewInterface[][] = [];
  rowsToIterate: number[] = [];
  newsService: NewsService = new NewsService();

  constructor() {
    this.initializeNews();
  }

  async initializeNews(){
    this.NewsTmp = await this.newsService.GetNewsFromDB();
    let rows: number = Math.ceil(this.NewsTmp.length / 3);

    for(let i = 0; i < rows; i++){
      let newsArr: NewInterface[] = [];
      newsArr.push(this.NewsTmp[0]);
      newsArr.push(this.NewsTmp[1]);
      newsArr.push(this.NewsTmp[2]);

      this.News.push(newsArr);

      this.NewsTmp.splice(0,3);

      this.rowsToIterate.push(i);
    }
  }

  /* async initializeNews() {
    // Please be nice to me, I'm proud of that. 
    this.news = this.getNewsFromJSON();
    this.news = await this.getNews();
    this.urls.push()
  } */

  /* async getNews(): Promise<NewInterface[]> {
    var ns: NewsService = new NewsService();
    const records: News[] = await ns.GetNewsFromDB();
    // Remapping the database request to NewInterface[]
    const news: NewInterface[] = records.map(record => ({
      id: record.model['id'],
      title: record.model['title'],
      desc: record.model['desc'],
      date: new Date(record.model['created']),
      url: record.url
    }));
    return news;
  } */

  getNewsFromJSON(): NewInterface[]{
    var ns: NewsService = new NewsService();
    return ns.getNewsFromJSON();
  }
}