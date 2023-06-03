import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { KlijentComponent } from './klijent/klijent.component';
import { AgencijaComponent } from './agencija/agencija.component';
import { AdminComponent } from './admin/admin.component';
import { AzuriranjeAdminComponent } from './azuriranje-admin/azuriranje-admin.component';
import { StranicaAgencijaComponent } from './stranica-agencija/stranica-agencija.component';
import { ProfilKlijentComponent } from './profil-klijent/profil-klijent.component';
import { ObjekatKlijentComponent } from './objekat-klijent/objekat-klijent.component';
import { PosloviKlijentComponent } from './poslovi-klijent/poslovi-klijent.component';
import { AgencijeKlijentComponent } from './agencije-klijent/agencije-klijent.component';
import { ProfilAgencijaComponent } from './profil-agencija/profil-agencija.component';
import { PosloviAgencijaComponent } from './poslovi-agencija/poslovi-agencija.component';
import { RadniciAgencijaComponent } from './radnici-agencija/radnici-agencija.component';
import { ObjekatDodavanjeComponent } from './objekat-dodavanje/objekat-dodavanje.component';
import { SkicaKreiranjeComponent } from './skica-kreiranje/skica-kreiranje.component';
import { RadniciAdminComponent } from './radnici-admin/radnici-admin.component';

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'zaboravljenaLozinka', component: ZaboravljenaLozinkaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava/admin', component: PrijavaAdminComponent },
  { path: 'klijent', component: KlijentComponent },
  { path: 'agencija', component: AgencijaComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/azuriranje', component: AzuriranjeAdminComponent },
  { path: 'admin/radnici', component: RadniciAdminComponent },
  { path: 'agencija/stranica', component: StranicaAgencijaComponent },
  { path: 'klijent/profil', component: ProfilKlijentComponent },
  { path: 'klijent/objekat', component: ObjekatKlijentComponent },
  { path: 'klijent/agencije', component: AgencijeKlijentComponent },
  { path: 'klijent/agencije', component: AgencijeKlijentComponent },
  { path: 'klijent/poslovi', component: PosloviKlijentComponent },
  { path: 'klijent/dodajObjekat/podaci', component: ObjekatDodavanjeComponent },
  { path: 'klijent/dodajObjekat/skica', component: SkicaKreiranjeComponent },
  { path: 'agencija/profil', component: ProfilAgencijaComponent },
  { path: 'agencija/radnici', component: RadniciAgencijaComponent },
  { path: 'agencija/poslovi', component: PosloviAgencijaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
