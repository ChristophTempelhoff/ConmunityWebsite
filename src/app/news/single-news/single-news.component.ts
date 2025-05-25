import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/ClassesAndInterfaces/New';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent {

  news: News = { newsID: '', title: '', created: 'new Date()', description: '', introduction: '', img: '' };

  id: string = "";

  newsService: NewsService = new NewsService(inject(HttpClient));

  isLoading: boolean = true; // Loading state


  constructor(private route: ActivatedRoute) {

    this.id = route.snapshot.paramMap.get('id') as string;

    console.log(this.id);

    

    this.loadNews();

  }


  async loadNews() {

    this.newsService.getSingleNewsFromDB(this.id).subscribe((singleNews) => {
      this.news = singleNews;
      this.isLoading = false;
    });

  }

}