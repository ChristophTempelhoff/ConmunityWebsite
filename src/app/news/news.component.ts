import { Component } from '@angular/core';
import { NewInterface } from "../ClassesAndInterfaces/New";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent {
  news: NewInterface[] = [];
}
