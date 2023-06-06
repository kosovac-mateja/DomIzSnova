import { Component, OnInit } from '@angular/core';
import { PosaoService } from '../services/posao.service';
import { Posao } from '../models/posao';
import { ObjekatService } from '../services/objekat.service';
import { KlijentService } from '../services/klijent.service';
import { Klijent } from '../models/klijent';
import { Objekat } from '../models/objekat';
import { Radnik } from '../models/radnik';
import { RadnikService } from '../services/radnik.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poslovi-agencija',
  templateUrl: './poslovi-agencija.component.html',
  styleUrls: ['./poslovi-agencija.component.css'],
})
export class PosloviAgencijaComponent implements OnInit {
  constructor(
    private posaoServis: PosaoService,
    private objekatServis: ObjekatService,
    private klijentServis: KlijentService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.agencija = sessionStorage.getItem('korisnik');
    this.posaoServis
      .dohvatiPosloveAgencije(this.agencija)
      .subscribe((poslovi: Posao[]) => {
        this.poslovi = poslovi;
        poslovi.forEach((posao) => {
          this.objekatServis
            .dohvatiObjekat(posao.idObjekat)
            .subscribe((objekat: Objekat) => {
              this.objekti.push(objekat);
            });
          this.klijentServis
            .dohvatiKlijenta(posao.klijent)
            .subscribe((klijent: Klijent) => {
              this.klijenti.push(klijent);
            });
        });
      });
  }

  klijent(korisnickoIme: string) {
    return this.klijenti.find(
      (klijent) => klijent.korisnickoIme == korisnickoIme
    );
  }

  objekat(idObjekat: string) {
    return this.objekti.find((objekat) => objekat._id == idObjekat);
  }

  prihvati() {
    this.prihvacenaPonuda = true;
  }

  odbij(id: string) {
    this.posaoServis
      .azurirajPodatak(id, 'status', 'odbijen')
      .subscribe((odgovor) => {
        this.ngOnInit();
      });
  }

  posaljiPonudu(id: string) {
    this.posaoServis
      .azurirajPodatak(id, 'ponuda', this.ponuda)
      .subscribe((odgovor) => {
        this.posaoServis
          .azurirajPodatak(id, 'status', 'ponuda')
          .subscribe((odgovor) => {
            alert('Ponuda uspesno poslata!');
            this.ponuda = 0;
            this.ngOnInit();
          });
      });
  }

  skica(idO: string, idP: string) {
    let idSkica = this.objekti.find((objekat) => objekat._id == idO).idSkica;
    sessionStorage.setItem('idSkica', idSkica);
    sessionStorage.setItem('idPosao', idP);
    this.ruter.navigate(['/agencija/skica']);
  }

  agencija: string = '';
  poslovi: Posao[] = [];
  klijenti: Klijent[] = [];
  objekti: Objekat[] = [];

  prihvacenaPonuda: boolean = false;
  ponuda: number = 0;
}
