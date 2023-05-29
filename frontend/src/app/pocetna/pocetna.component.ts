import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agencijaServis.dohvatiAgencije().subscribe((agencije: Agencija[]) => {
      this.agencije = agencije;
    });
  }

  prijava() {
    this.router.navigate(['/prijava']);
  }

  registracija() {
    this.router.navigate(['/registracija']);
  }

  agencijaIzbor(korisnickoIme) {
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
