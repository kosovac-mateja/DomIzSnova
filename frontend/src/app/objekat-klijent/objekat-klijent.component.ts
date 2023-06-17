import { Component, OnInit } from '@angular/core';
import { ObjekatService } from '../services/objekat.service';
import { Objekat } from '../models/objekat';
import { Router } from '@angular/router';
import { Posao } from '../models/posao';
import { PosaoService } from '../services/posao.service';

@Component({
  selector: 'app-objekat-klijent',
  templateUrl: './objekat-klijent.component.html',
  styleUrls: ['./objekat-klijent.component.css'],
})
export class ObjekatKlijentComponent implements OnInit {
  constructor(
    private objekatServis: ObjekatService,
    private ruter: Router,
    private posaoServis: PosaoService
  ) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.objekatServis
      .dohvatiObjekteVlasnika(this.korisnickoIme)
      .subscribe((objekti: Objekat[]) => {
        this.objekti = objekti;
      });
    this.posaoServis
      .dohvatiPosloveKlijenta(this.korisnickoIme)
      .subscribe((poslovi: Posao[]) => {
        this.posloviKlijenta = poslovi;
      });
  }

  prikazSkice(objekat: Objekat) {
    sessionStorage.setItem('idSkica', objekat.idSkica);
    sessionStorage.setItem('idPosao', '');
    this.ruter.navigate(['/klijent/skica']);
  }

  obrisiObjekat(objekat: Objekat) {
    this.posloviKlijenta.forEach((posao) => {
      if (
        posao.idObjekat == objekat._id &&
        (posao.status == 'aktivan' ||
          posao.status == 'na cekanju' ||
          posao.status == 'ponuda')
      ) {
        this.greska = 'Ne možete obrisati objekat koji je uključen u posao.';
        return;
      }
    });

    this.objekatServis.obrisiObjekat(objekat._id).subscribe((res) => {
      this.objekatServis
        .dohvatiObjekteVlasnika(this.korisnickoIme)
        .subscribe((objekti: Objekat[]) => {
          this.objekti = objekti;
        });
    });
  }

  izmeniObjekat(objekat: Objekat) {
    if (objekat.tip != 'stan' && objekat.tip != 'kuca') {
      this.greska = 'Tip objekta može biti samo stan ili kuća.';
      return;
    }
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

  izmeniSkicu(objekat: Objekat) {
    sessionStorage.setItem('idSkica', objekat.idSkica);
    this.ruter.navigate(['/klijent/skica/izmene']);
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  korisnickoIme: string;
  objekti: Objekat[] = [];

  posloviKlijenta: Posao[] = [];

  rezimIzmene: boolean = false;

  greska: string = '';
}
