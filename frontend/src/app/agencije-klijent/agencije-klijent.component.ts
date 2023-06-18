import { Component, OnInit } from '@angular/core';
import { Agencija } from '../models/agencija';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencije-klijent',
  templateUrl: './agencije-klijent.component.html',
  styleUrls: ['./agencije-klijent.component.css'],
})
export class AgencijeKlijentComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agencijaServis.dohvatiAgencije().subscribe((agencije: Agencija[]) => {
      this.agencije = agencije;
    });
  }

  agencijaIzbor(korisnickoIme) {
    sessionStorage.setItem('registrovan', 'true');
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
  odjava() {
    sessionStorage.clear();
    this.router.navigate(['/']);
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
  pretragaNaziv: string;
  pretragaAdresa: string;
  parametarPretrage: string = 'naziv';

  parametarSortiranja: string = 'naziv';
  nacinSortiranja: string = 'rastuce';
}
