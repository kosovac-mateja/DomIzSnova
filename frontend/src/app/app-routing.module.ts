import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ZaboravljenaLozinkaComponent } from './zaboravljena-lozinka/zaboravljena-lozinka.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'zaboravljenaLozinka', component: ZaboravljenaLozinkaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava/admin', component: PrijavaAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
