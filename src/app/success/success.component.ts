import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  antragsNummer: number = 0;

  constructor(private route: ActivatedRoute){
    if(route.snapshot.queryParamMap.has("antragsID")){
      this.antragsNummer = route.snapshot.queryParamMap.get("antragsID") as unknown as number;
    }
  }

}
