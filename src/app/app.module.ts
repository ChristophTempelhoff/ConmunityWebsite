import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { DatenschutzComponent } from './datenschutz/datenschutz.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { PartnerComponent } from './partner/partner.component';
import { EventsComponent } from './events/events.component';
import { TaetigkeitsbereicheComponent } from './taetigkeitsbereiche/taetigkeitsbereiche.component';
import { VereinComponent } from './verein/verein.component';
import { ZieleComponent } from './ziele/ziele.component';
import { DownloadComponent } from './download/download.component';
import { MitgliedsschaftComponent } from './mitgliedsschaft/mitgliedsschaft.component';
import { SingleNewsComponent } from './news/single-news/single-news.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccessComponent } from './success/success.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    NavbarComponent,
    FooterComponent,
    ImpressumComponent,
    DatenschutzComponent,
    AboutUsComponent,
    PartnerComponent,
    EventsComponent,
    TaetigkeitsbereicheComponent,
    VereinComponent,
    ZieleComponent,
    DownloadComponent,
    MitgliedsschaftComponent,
    SingleNewsComponent,
    RegisterComponent,
    SuccessComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
