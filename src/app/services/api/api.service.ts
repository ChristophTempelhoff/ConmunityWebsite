import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Users } from '../../users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = "http://localhost/angularPHP";

  constructor(private httpClient : HttpClient, private router : Router) { }

  public userregistration(f_name:any, l_name:any, email:any, password:any, mobile:any){
    return this.httpClient.post<any>(this.baseUrl + '/register.php',
      {
        f_name, l_name, email, password, mobile
      }
    )
    .pipe(map(Users =>{
      if (Users["message"]=="success") {
        this.router.navigate(['success']);
      }

        
      return Users;
    }));
  }
}
