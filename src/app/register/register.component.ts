import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  angForm: FormGroup;
  
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router){
    this.angForm = this.fb.group({
      f_name: ['', Validators.required],
      l_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  postdata(angForm:any){
    this.dataService.userregistration(
      angForm.value.f_name,
      angForm.value.l_name,
      angForm.value.email,
      angForm.value.password,
      angForm.value.mobile
    )
  .pipe(first())
  .subscribe(data => {
   // this.router.navigate(['login']);
  },
  error =>{
  });
  }


}