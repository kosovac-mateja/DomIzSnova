import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';
import { BlokiranjeService } from '../services/blokiranje.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private korisnikServis: KorisnikService,
    private router: Router,
    private blokiranjeServis: BlokiranjeService
  ) {}

  //dohvata sve agencije koje su prihvacene
  ngOnInit(): void {
    this.blokiranjeServis.startuj().subscribe((res) => {});
    this.korisnikServis
      .dohvatiKorisnike()
      .subscribe((korisnici: Korisnik[]) => {
        this.agencijaServis
          .dohvatiAgencije()
          .subscribe((agencije: Agencija[]) => {
            agencije.forEach((agencija) => {
              if (
                korisnici.find(
                  (korisnik) => korisnik.korisnickoIme == agencija.korisnickoIme
                ).status == 'prihvacen'
              ) {
                this.agencije.push(agencija);
              }
            });
          });
      });
  }

  prijava() {
    this.router.navigate(['/prijava']);
  }

  registracija() {
    this.router.navigate(['/registracija']);
  }

  agencijaIzbor(korisnickoIme) {
    sessionStorage.setItem('registrovan', 'false');
    sessionStorage.setItem('agencijaIzbor', korisnickoIme);
  }

  pretraga() {
    if (this.parametarPretrage == 'naziv') {
      this.agencijaServis
        .dohvatiAgencijePoNazivu(this.pretragaNaziv)
        .subscribe((agencije: Agencija[]) => {
          this.agencije = agencije;
        });
    } else if (this.parametarPretrage == 'adresa') {
      this.agencijaServis
        .dohvatiAgencijePoAdresi(this.pretragaAdresa)
        .subscribe((agencije: Agencija[]) => {
          this.agencije = agencije;
        });
    } else if (this.parametarPretrage == 'oba') {
      this.agencijaServis
        .dohvatiAgencijePoNazivuIAdresi(this.pretragaNaziv, this.pretragaAdresa)
        .subscribe((agencije: Agencija[]) => {
          this.agencije = agencije;
        });
    }
  }

  sortiranje() {
    if (this.parametarSortiranja == 'naziv') {
      if (this.nacinSortiranja == 'rastuce') {
        this.agencije.sort((a, b) => {
          if (a.naziv > b.naziv) return 1;
          else if (a.naziv < b.naziv) return -1;
          else return 0;
        });
      } else if (this.nacinSortiranja == 'opadajuce') {
        this.agencije.sort((a, b) => {
          if (a.naziv > b.naziv) return -1;
          else if (a.naziv < b.naziv) return 1;
          else return 0;
        });
      }
    } else if (this.parametarSortiranja == 'adresa') {
      if (this.nacinSortiranja == 'rastuce') {
        this.agencije.sort((a, b) => {
          if (a.ulica > b.ulica) return 1;
          else if (a.ulica < b.ulica) return -1;
          else return 0;
        });
      } else if (this.nacinSortiranja == 'opadajuce') {
        this.agencije.sort((a, b) => {
          if (a.ulica > b.ulica) return -1;
          else if (a.ulica < b.ulica) return 1;
          else return 0;
        });
      }
    }
  }

  agencije: Agencija[] = [];
  pretragaNaziv: string = '';
  pretragaAdresa: string = '';
  parametarPretrage: string = 'naziv';

  parametarSortiranja: string = 'naziv';
  nacinSortiranja: string = 'rastuce';
}
