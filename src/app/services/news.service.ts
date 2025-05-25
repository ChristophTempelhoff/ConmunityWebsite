import { HttpClient } from '@angular/common/http';
import { News } from './../ClassesAndInterfaces/New';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseURL: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  GetNewsFromDB(): Observable<News[]>{
    return this.http.get<News[]>(this.baseURL + "/news.php");
  }

  getSingleNewsFromDB(id: string): Observable<News>{
    return this.http.get<News>(this.baseURL + "/news/singleNews.php", {params: {"newsID": id}});
  }
}