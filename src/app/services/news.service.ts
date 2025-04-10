import { HttpClient, HttpResponse } from '@angular/common/http';
import { News } from './../ClassesAndInterfaces/New';
import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseURL: string = "http://localhost/angularPHP";

  constructor(private http: HttpClient) { }

  GetNewsFromDB(): Observable<News[]>{
    return this.http.get<News[]>(this.baseURL + "/news.php");
  }

  getSingleNewsFromDB(id: string): Observable<News>{
    return this.http.get<News>(this.baseURL + "/news/singlenews.php/" + id);
    // let records = await this.pb.collection('News').getOne(id);
    // return {id: records['id'], title: records['title'], desc: records['desc'], introduction: records['introduction'], date: new Date(records['created']), ImageUrl: this.pb.files.getUrl(records, records['img'])};
  }
}