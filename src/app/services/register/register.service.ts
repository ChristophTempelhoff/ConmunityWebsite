import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Mitgliedsantraege } from 'src/app/ClassesAndInterfaces/mitgliedsantraege';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl:string = "http://localhost/angularPHP";

  constructor(private httpClient : HttpClient, private router : Router) { }

  public create_antrag(antrag: Mitgliedsantraege){
    return this.httpClient.post<any>(this.baseUrl + '/register.php',
      antrag.getProps() // <--- wichtig!
    )

    .pipe(map(gesendeterAntrag =>{
      if(gesendeterAntrag["message"]=="success"){
        this.router.navigate(['success']);
      }

      return gesendeterAntrag;
    }));
  }
}
