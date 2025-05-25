import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Mitgliedsantraege } from 'src/app/ClassesAndInterfaces/mitgliedsantraege';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUrl:string = environment.apiURL;

  constructor(private httpClient : HttpClient, private router : Router) { }

  public create_antrag(antrag: Mitgliedsantraege){
    return this.httpClient.post<any>(this.baseUrl + '/register.php',
      antrag.getProps() // <--- wichtig!
    )

    .pipe(map(gesendeterAntrag =>{
      if(gesendeterAntrag["message"]=="success" && gesendeterAntrag["Antragsnummer"] != null){
        const antragsID = gesendeterAntrag["Antragsnummer"] as number;
        this.router.navigate(['/success'], {queryParams: {antragsID: antragsID}});
      }

      return gesendeterAntrag;
    }));
  }
}
