import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { PrivremenaLozinka } from '../models/privremenaLozinka';
import { MejlService } from '../services/mejl.service';
import { Router } from '@angular/router';
import { ProveraService } from '../services/provera.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css'],
})
export class PromenaLozinkeComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private mejlServis: MejlService,
    private proveraServis: ProveraService,
    private ruter: Router
  ) {}

  async ngOnInit() {
    let korisnickoIme = sessionStorage.getItem('korisnik');
    this.privremeneLozinke = await this.mejlServis.dohvatiPrivremeneLozinke(
      korisnickoIme
    );
    this.korisnikServis
      .dohvatiKorisnika(korisnickoIme)
      .subscribe((korisnik: Korisnik) => {
        this.korisnik = korisnik;
      });
  }

  promeniLozinku() {
    if (this.staraLozinka != this.korisnik.lozinka) {
      let ind = false;
      for (const privremena of this.privremeneLozinke) {
        if (privremena.lozinka == this.staraLozinka) {
          if (new Date(privremena.vremeIsteka) > new Date()) {
            ind = true;
            break;
          }
        }
      }
      if (!ind) {
        this.greska = 'Uneta stara lozinka nije ispravna';
        return;
      }
    } else if (this.novaLozinka != this.potvrdaNoveLozinke) {
      this.greska = 'Unete lozinke se ne poklapaju';
      return;
    } else if (this.novaLozinka == this.staraLozinka) {
      this.greska = 'Nova lozinka ne sme biti ista kao stara';
      return;
    }
    let provera = this.proveraServis.proveraLozinka(this.novaLozinka);
    if (provera != 'ok') {
      this.greska = provera;
      return;
    }
    this.korisnikServis
      .azurirajLozinku(this.korisnik.korisnickoIme, this.novaLozinka)
      .subscribe((res) => {
        alert('Lozinka uspesno promenjena!');
        sessionStorage.clear();
        this.ruter.navigate(['/']);
      });
  }

  korisnik: Korisnik = new Korisnik();
  privremeneLozinke: PrivremenaLozinka[] = [];

  staraLozinka: string = '';
  novaLozinka: string = '';
  potvrdaNoveLozinke: string = '';

  greska: string = '';
}
