import { Component, OnInit } from '@angular/core';
import { NewsService } from "../services/news.service";
import { NewInterface } from "../ClassesAndInterfaces/New";

declare var require: any

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent{
  news: NewInterface[] = this.getNews();

  getNews(): NewInterface[]{
    const news: NewInterface[] = require("src/app/ClassesAndInterfaces/news.json").items;
    console.log(news);
    return news;
  }
  
}
