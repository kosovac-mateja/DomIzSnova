import { Component, OnInit } from '@angular/core';
import { Agencija } from '../models/agencija';
import { AgencijaService } from '../services/agencija.service';
import { RecenzijaService } from '../services/recenzija.service';
import { Recenzija } from '../models/recenzija';
import { KlijentService } from '../services/klijent.service';
import { Objekat } from '../models/objekat';
import { ObjekatService } from '../services/objekat.service';
import { PosaoService } from '../services/posao.service';

@Component({
  selector: 'app-stranica-agencija',
  templateUrl: './stranica-agencija.component.html',
  styleUrls: ['./stranica-agencija.component.css'],
})
export class StranicaAgencijaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private recenzijaServis: RecenzijaService,
    private objekatServis: ObjekatService,
    private posaoServis: PosaoService
  ) {}

  ngOnInit(): void {
    let korisnickoIme = sessionStorage.getItem('agencijaIzbor');
    this.agencijaServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.agencija = agencija;
        this.recenzijaServis
          .dohvatiRecenzijeAgencije(agencija.korisnickoIme)
          .subscribe((recenzije: Recenzija[]) => {
            this.recenzije = recenzije;
          });
      });
    this.registrovan = sessionStorage.getItem('registrovan') == 'true';

    if (this.registrovan) {
      this.klijent = sessionStorage.getItem('korisnik');
      this.objekatServis
        .dohvatiObjekteVlasnika(this.klijent)
        .subscribe((objekti: Objekat[]) => {
          this.objekti = objekti;
        });
    }
  }

  zatraziSaradnju() {
    this.posaoServis
      .ubaciPosao(
        this.klijent,
        this.agencija.korisnickoIme,
        this.objekat,
        'na cekanju',
        false,
        this.vremenskiPeriod
      )
      .subscribe((posao) => {
        alert('Uspesno poslat zahtev za saradnju!');
        this.objekat = '';
        this.vremenskiPeriod = new Date();
      });
  }

  agencija: Agencija;
  klijent: string = '';
  registrovan: boolean = false;
  recenzije: Recenzija[] = [];

  objekat: string = '';
  objekti: Objekat[] = [];
  vremenskiPeriod: Date = new Date();
}
