import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private korisnikServis: KorisnikService,
    private router: Router
  ) {}

  //dohvata sve agencije koje su prihvacene
  ngOnInit(): void {
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

  agencije: Agencija[] = [];
  pretragaNaziv: string;
  pretragaAdresa: string;
  parametarPretrage: string = 'naziv';
}
