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

  agencije: Agencija[] = [];
  pretragaNaziv: string;
  pretragaAdresa: string;
  parametarPretrage: string = 'naziv';
}
