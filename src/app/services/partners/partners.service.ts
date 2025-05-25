import { Partner } from 'src/app/ClassesAndInterfaces/Partner';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {

  constructor(private http: HttpClient) { }

  private baseURL: string = environment.apiURL + "/partner.php";

  getPartnersFromDB(): Observable<Partner[]>{    
    return this.http.get<Partner[]>(this.baseURL);
  }
}
