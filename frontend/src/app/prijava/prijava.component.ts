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

  ngOnInit(): void {}

  prijava() {
    if (this.korisnickoIme == '' || this.lozinka == '') {
      this.greska = 'Niste uneli sve podatke';
      return;
    }

    this.korisnikServis
      .dohvatiKorisnika(this.korisnickoIme)
      .subscribe((korisnik: Korisnik) => {
        this.korisnik = korisnik;
        if (this.korisnik == undefined) {
          this.greska = 'Ne postoji korisnik sa unetim korisnickim imenom';
          return;
        }

        if (this.korisnik.lozinka != this.lozinka) {
          this.greska = 'Pogresna lozinka';
          return;
        }

        if (korisnik.status != 'prihvacen') {
          this.greska = 'Vas zahtev za registraciju jos uvek nije prihvacen';
          return;
        }

        if (this.korisnik.tip == 'klijent') {
          sessionStorage.setItem('korisnik', this.korisnik.korisnickoIme);
          this.ruter.navigate(['/klijent']);
        } else if (this.korisnik.tip == 'agencija') {
          sessionStorage.setItem('korisnik', this.korisnik.korisnickoIme);
          this.ruter.navigate(['/agencija']);
        }
      });
  }

  korisnickoIme: string = '';
  lozinka: string = '';
  korisnik: Korisnik;

  greska: string = '';
}
