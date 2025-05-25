import { Component, inject, OnInit } from '@angular/core';
import { News } from "../ClassesAndInterfaces/New";
import { NewsService } from '../services/news.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  private NewsTmp: News[] = [];
  News: News[][] = [];
  rowsToIterate: number[] = [];
  newsService: NewsService = new NewsService(inject(HttpClient));
  row: News[] = [];
  site: number = 1;

  isLoading: boolean = true; // Loading state
  
  constructor() {
    this.initializeNews();
  }


  async initializeNews(){
    this.newsService.GetNewsFromDB().subscribe((news) => {
      news.forEach((newObj) => {
        this.NewsTmp.push(newObj);
      })
      let rows: number = Math.ceil(this.NewsTmp.length / 3);
  
      this.isLoading = false; // Set loading to false after loading
  
      for(let i = 0; i < rows; i++){
        let newsArr: News[] = [];
        newsArr.push(this.NewsTmp[0]);
        newsArr.push(this.NewsTmp[1]);
        newsArr.push(this.NewsTmp[2]);
  
        //if(newsArr[ß].title.length === 0) newsArr
  
        this.News.push(newsArr);
  
        this.NewsTmp.splice(0,3);
  
        this.rowsToIterate.push(i);
      }
    });
  }

}