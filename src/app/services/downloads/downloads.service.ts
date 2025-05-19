
import { Injectable } from '@angular/core';
import PocketBase, {RecordModel} from 'pocketbase';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Document } from "../../ClassesAndInterfaces/Document";


@Injectable({ providedIn: 'root' })
export class DownloadsService {
  private apiUrl = 'http://localhost/angularPHP/documents/get_files.php'; // NUR LOKAL!!!!!!!!!!!!!! dann in Prodction auf echte db


  constructor(private http: HttpClient) {}

  getDocuments(search: string = '', type: string = ''): Observable<Document[]> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (type) params = params.set('type', type);

    return this.http.get<Document[]>(this.apiUrl, { params });
  }

  getFileTypes(): Observable<string[]> {
     return this.http.get<string[]>('http://localhost/angularPHP/documents/filetype.php');
  }

}