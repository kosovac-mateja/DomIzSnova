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

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'zaboravljenaLozinka', component: ZaboravljenaLozinkaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava/admin', component: PrijavaAdminComponent },
  { path: 'klijent', component: KlijentComponent },
  { path: 'agencija', component: AgencijaComponent },
  { path: 'admin', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
