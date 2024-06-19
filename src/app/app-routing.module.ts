import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Files for routes
import { NewsComponent } from "./news/news.component";
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'impressum',
    component: ImpressumComponent
  },
  {
    path: 'datenschutz',
    component: DatenschutzComponent
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
