import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { MejlService } from '../services/mejl.service';
import { PrivremenaLozinka } from '../models/privremenaLozinka';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private ruter: Router,
    private mejlServis: MejlService
  ) {}

  ngOnInit(): void {}

  async prijava() {
    if (this.korisnickoIme == '' || this.lozinka == '') {
      this.greska = 'Niste uneli sve podatke';
      return;
    }

    this.privLozinka = await this.mejlServis.dohvatiPrivremenuLozinku(
      this.korisnickoIme
    );

    this.korisnikServis
      .dohvatiKorisnika(this.korisnickoIme)
      .subscribe((korisnik: Korisnik) => {
        this.korisnik = korisnik;
        if (this.korisnik == undefined) {
          this.greska = 'Ne postoji korisnik sa unetim korisnickim imenom';
          return;
        }

        if (korisnik.status != 'prihvacen') {
          this.greska = 'Vas zahtev za registraciju jos uvek nije prihvacen';
          return;
        }

        if (this.korisnik.lozinka != this.lozinka) {
          if (
            this.privLozinka == undefined ||
            this.privLozinka.lozinka != this.lozinka ||
            new Date(this.privLozinka.vremeIsteka) < new Date()
          ) {
            this.greska = 'Pogresna lozinka';
            return;
          }
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

  privLozinka: PrivremenaLozinka;

  greska: string = '';
}
