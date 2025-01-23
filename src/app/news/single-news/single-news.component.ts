import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/ClassesAndInterfaces/New';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent {

  news: News = { id: '', title: '', date: new Date(), desc: '', introduction: '', ImageUrl: '' };

  id: string = "";

  newsService: NewsService = new NewsService();

  isLoading: boolean = true; // Loading state


  constructor(private route: ActivatedRoute) {

    this.id = route.snapshot.paramMap.get('id') as string;

    console.log(this.id);

    

    this.loadNews();

  }


  async loadNews() {

    this.news = await this.newsService.getSingleNewsFromDB(this.id);

    this.isLoading = false; // Set loading to false after loading

  }

}