import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Files for routes
import { NewsComponent } from "./news/news.component";
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PartnerComponent } from './partner/partner.component';
import { EventsComponent } from './events/events.component';
import { VereinComponent } from './verein/verein.component';
import { TaetigkeitsbereicheComponent } from './taetigkeitsbereiche/taetigkeitsbereiche.component';
import { ZieleComponent } from './ziele/ziele.component';

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
  },
  {
    path: 'partner',
    component: PartnerComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: '',
    redirectTo: '/news',
    pathMatch: 'full'
  },
  {
    path: 'verein',
    component: VereinComponent
  },
  {
    path: 'taetigkeitsbereiche',
    component: TaetigkeitsbereicheComponent
  },
  {
    path: 'ziele',
    component: ZieleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "top"})],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
