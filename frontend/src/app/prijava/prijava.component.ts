import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent implements OnInit {
  constructor(private korisnikServis: KorisnikService, private ruter: Router) {}

  ngOnInit(): void {
    this.korisnikServis
      .dohvatiKorisnike()
      .subscribe((korisnici: Korisnik[]) => {
        this.korisnici = korisnici;
      });
  }

  prijava() {
    if (this.korisnickoIme == '' || this.lozinka == '') {
      this.greska = 'Niste uneli sve podatke';
      return;
    }

    let korisnik = this.korisnici.find(
      (korisnik) => korisnik.korisnickoIme == this.korisnickoIme
    );

    if (korisnik == undefined) {
      this.greska = 'Ne postoji korisnik sa unetim korisnickim imenom';
      return;
    }

    if (korisnik.lozinka != this.lozinka) {
      this.greska = 'Pogresna lozinka';
      return;
    }

    if (korisnik.tip == 'klijent') {
      this.ruter.navigate(['/klijent']);
    } else if (korisnik.tip == 'agencija') {
      this.ruter.navigate(['/agencija']);
    }
  }

  korisnickoIme: string;
  lozinka: string;

  korisnici: Korisnik[] = [];

  greska: string = '';
}
