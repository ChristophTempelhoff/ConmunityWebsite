import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private elementRef: ElementRef) { }


  collapseNavbar(): void {

    let navbar = this.elementRef.nativeElement.querySelector('.navbar-collapse');

    navbar.classList.remove('show');

  }
}


