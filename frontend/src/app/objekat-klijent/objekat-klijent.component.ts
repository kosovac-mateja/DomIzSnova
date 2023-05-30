import { Component, OnInit } from '@angular/core';
import { ObjekatService } from '../services/objekat.service';
import { Objekat } from '../models/objekat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objekat-klijent',
  templateUrl: './objekat-klijent.component.html',
  styleUrls: ['./objekat-klijent.component.css'],
})
export class ObjekatKlijentComponent implements OnInit {
  constructor(private objekatServis: ObjekatService, private ruter: Router) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.objekatServis
      .dohvatiObjekteVlasnika(this.korisnickoIme)
      .subscribe((objekti: Objekat[]) => {
        this.objekti = objekti;
      });
  }

  prikazSkice() {}

  obrisiObjekat(objekat: Objekat) {
    this.objekatServis.obrisiObjekat(objekat._id).subscribe((res) => {
      this.objekatServis
        .dohvatiObjekteVlasnika(this.korisnickoIme)
        .subscribe((objekti: Objekat[]) => {
          this.objekti = objekti;
        });
    });
  }

  izmeniObjekat(objekat: Objekat) {
    this.objekatServis.azurirajObjekat(objekat).subscribe((res) => {
      this.objekatServis
        .dohvatiObjekteVlasnika(this.korisnickoIme)
        .subscribe((objekti: Objekat[]) => {
          this.rezimIzmene = false;
          this.objekti = objekti;
        });
    });
  }

  dodajObjekat() {
    this.ruter.navigate(['/klijent/dodajObjekat/podaci']);
  }

  izmeniSkicu(objekat: Objekat) {}

  korisnickoIme: string;
  objekti: Objekat[] = [];

  rezimIzmene: boolean = false;
}
