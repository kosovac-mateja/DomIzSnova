import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { FormsModule } from '@angular/forms';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { AdminComponent } from './admin/admin.component';
import { AzuriranjeAdminComponent } from './azuriranje-admin/azuriranje-admin.component';
import { StranicaAgencijaComponent } from './stranica-agencija/stranica-agencija.component';
import { ProfilKlijentComponent } from './profil-klijent/profil-klijent.component';
import { ObjekatKlijentComponent } from './objekat-klijent/objekat-klijent.component';
import { AgencijeKlijentComponent } from './agencije-klijent/agencije-klijent.component';
import { PosloviKlijentComponent } from './poslovi-klijent/poslovi-klijent.component';
import { ProfilAgencijaComponent } from './profil-agencija/profil-agencija.component';
import { RadniciAgencijaComponent } from './radnici-agencija/radnici-agencija.component';
import { PosloviAgencijaComponent } from './poslovi-agencija/poslovi-agencija.component';
import { ObjekatDodavanjeComponent } from './objekat-dodavanje/objekat-dodavanje.component';
import { SkicaKreiranjeComponent } from './skica-kreiranje/skica-kreiranje.component';
import { RadniciAdminComponent } from './radnici-admin/radnici-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    ZaboravljenaLozinkaComponent,
    RegistracijaComponent,
    PrijavaComponent,
    PrijavaAdminComponent,
    KlijentComponent,
    AgencijaComponent,
    AdminComponent,
    AzuriranjeAdminComponent,
    StranicaAgencijaComponent,
    ProfilKlijentComponent,
    ObjekatKlijentComponent,
    AgencijeKlijentComponent,
    PosloviKlijentComponent,
    ProfilAgencijaComponent,
    RadniciAgencijaComponent,
    PosloviAgencijaComponent,
    ObjekatDodavanjeComponent,
    SkicaKreiranjeComponent,
    RadniciAdminComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
