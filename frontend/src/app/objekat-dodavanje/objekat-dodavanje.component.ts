import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Koordinata } from '../models/koordinata';
import { Dimenzije } from '../models/dimenzije';
import { SkicaService } from '../services/skica.service';
import { ObjekatService } from '../services/objekat.service';
import { Skica } from '../models/skica';
import { ProveraService } from '../services/provera.service';

@Component({
  selector: 'app-objekat-dodavanje',
  templateUrl: './objekat-dodavanje.component.html',
  styleUrls: ['./objekat-dodavanje.component.css'],
})
export class ObjekatDodavanjeComponent implements OnInit {
  constructor(
    private objekatServis: ObjekatService,
    private skicaServis: SkicaService,
    private proveraServis: ProveraService,
    private ruter: Router
  ) {}

  ngOnInit(): void {}

  async dalje() {
    let proveraAdresa = await this.proveraServis.proveraUlica(this.adresa);
    if (proveraAdresa != 'ok') {
      this.greska = proveraAdresa;
      return;
    }
    if (this.kvadratura <= 0) {
      this.greska = 'Broj kvadrata mora biti pozitivan broj';
      return;
    }
    sessionStorage.setItem('dodavanjeObjektaTip', this.tip);
    sessionStorage.setItem('dodavanjeObjektaAdresa', this.adresa);
    sessionStorage.setItem(
      'dodavanjeObjektaBrProstorija',
      this.brProstorija.toString()
    );
    sessionStorage.setItem(
      'dodavanjeObjektaKvadratura',
      this.kvadratura.toString()
    );
    this.ruter.navigate(['/klijent/dodajObjekat/skica']);
  }

  otpremanjeFajla(fajl) {
    if (fajl.target.files[0]) {
      if (fajl.target.files[0].type == 'application/json') {
        const citac = new FileReader();
        citac.onload = (e: any) => {
          const sadrzajFajla = citac.result as string;
          const jsonFormat = JSON.parse(sadrzajFajla);
          this.greska = '';
          this.tip = jsonFormat.tip;
          this.adresa = jsonFormat.adresa;
          this.brProstorija = jsonFormat.brProstorija;
          this.kvadratura = jsonFormat.kvadratura;
          this.koordinate = jsonFormat.koordinate;
          this.dimenzije = jsonFormat.dimenzije;
          this.koordinateVrata = jsonFormat.koordinateVrata;
        };
        citac.readAsText(fajl.target.files[0]);
      } else {
        this.greska = 'Fajl mora biti u JSON formatu';
      }
    }
  }

  async dodajObjekat() {
    let provera = await this.proveraServis.proveraObjekatJSON(
      this.tip,
      this.adresa,
      this.brProstorija,
      this.kvadratura,
      this.koordinate,
      this.dimenzije,
      this.koordinateVrata
    );
    if (provera != 'ok') {
      this.greska = provera;
      return;
    }
    let boje = [];
    for (let i = 0; i < this.koordinate.length; i++) {
      boje.push('white');
    }
    this.skicaServis
      .ubaciSkicu(this.koordinate, this.dimenzije, boje, this.koordinateVrata)
      .subscribe((skica: Skica) => {
        let id = skica._id;
        this.objekatServis
          .dodajObjekat(
            this.tip,
            this.adresa,
            this.brProstorija,
            this.kvadratura,
            id,
            sessionStorage.getItem('korisnik')
          )
          .subscribe((objekatId) => {
            alert('Uspešno ste dodali objekat!');
            this.ruter.navigate(['/klijent/objekat']);
          });
      });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  tip: string = 'stan';
  adresa: string = '';
  brProstorija: number = 1;
  kvadratura: number = 0;
  greska = '';

  koordinate: Koordinata[] = [];
  dimenzije: Dimenzije[] = [];
  koordinateVrata: Koordinata[] = [];
}
