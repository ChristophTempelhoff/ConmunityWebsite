import { Partner } from 'src/app/ClassesAndInterfaces/Partner';
import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "http://localhost/angularPHP/partner.php";

  getPartnersFromDB(): Observable<Partner[]>{    
    return this.http.get<Partner[]>(this.baseURL);
  }
}
