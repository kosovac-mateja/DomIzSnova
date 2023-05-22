import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Admin } from '../models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css'],
})
export class PrijavaAdminComponent implements OnInit {
  constructor(private adminServis: AdminService, private ruter: Router) {}

  ngOnInit(): void {
    this.adminServis.dohvatiAdmine().subscribe((admini: Admin[]) => {
      this.administratori = admini;
    });
  }

  prijava() {
    if (this.korisnickoIme == '' || this.lozinka == '') {
      this.greska = 'Niste uneli sve podatke';
      return;
    }

    let admin = this.administratori.find(
      (admin) => admin.korisnickoIme == this.korisnickoIme
    );

    if (admin == undefined) {
      this.greska = 'Ne postoji korisnik sa unetim korisnickim imenom';
      return;
    }

    if (admin.lozinka != this.lozinka) {
      this.greska = 'Pogresna lozinka';
      return;
    }

    this.ruter.navigate(['/admin']);
  }

  korisnickoIme: string;
  lozinka: string;

  administratori: Admin[] = [];

  greska: string = '';
}
