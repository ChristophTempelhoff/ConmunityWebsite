
import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Document } from "../../ClassesAndInterfaces/Document";
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class DownloadsService {
  private apiUrl = environment.apiURL + '/documents/get_files.php';
  // private apiUrl = 'http://localhost/angularPHP/documents/get_files.php';


  constructor(private http: HttpClient) {}

  getDocuments(search: string = '', type: string = ''): Observable<Document[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (type) params = params.set('type', type);

    return this.http.get<Document[]>(this.apiUrl, { params });
  }

  getFileTypes(): Observable<string[]> {
     return this.http.get<string[]>(environment.apiURL + '/documents/filetype.php');
  }

}