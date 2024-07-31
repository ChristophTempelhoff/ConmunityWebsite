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
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
