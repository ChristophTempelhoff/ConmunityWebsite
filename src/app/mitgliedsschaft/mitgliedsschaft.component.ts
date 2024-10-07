import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mitgliedsschaft',
  templateUrl: './mitgliedsschaft.component.html',
  styleUrls: ['./mitgliedsschaft.component.css']
})
export class MitgliedsschaftComponent {

  constructor(public router: Router){
  }

  routeToJoin(queryParam: String){
    this.router.navigate(['/join'], {
      queryParams: {memberType: queryParam}
    });
    
  }
}
