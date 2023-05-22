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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
