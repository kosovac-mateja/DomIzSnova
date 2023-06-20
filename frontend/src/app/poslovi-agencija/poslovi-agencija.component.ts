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
import { BlokiranjeService } from '../services/blokiranje.service';
import { BlokiranaAgencija } from '../models/blokiranaAgencija';

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
    private blokiranjeServis: BlokiranjeService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.agencija = sessionStorage.getItem('korisnik');
    this.posaoServis
      .dohvatiPosloveAgencije(this.agencija)
      .subscribe((poslovi: Posao[]) => {
        this.poslovi = poslovi;
        poslovi.forEach((posao) => {
          if (posao.status == 'na cekanju' || posao.status == 'ponuda')
            this.brojZahteva++;
          if (posao.status == 'aktivan') this.brojAktivnih++;
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
    this.blokiranjeServis
      .dohvatiSve()
      .subscribe((blokirane: BlokiranaAgencija[]) => {
        this.blokiraneAgencije = blokirane;
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

  prihvati(id: string) {
    this.izabranaAgencija = id;
    let blokirana = this.blokiraneAgencije.find(
      (agencija) => agencija.korisnickoIme == this.agencija
    );
    if (blokirana) {
      this.greska =
        'Vasa agencija je blokirana, ne mozete prihvatati nove poslove!';
      return;
    }
    this.prihvacenaPonuda = true;
  }

  odbij(id: string) {
    this.posaoServis
      .azurirajPodatak(id, 'status', 'odbijen')
      .subscribe((odgovor) => {
        window.location.reload();
      });
  }

  posaljiPonudu(id: string) {
    if (this.ponuda <= 0) {
      this.greska = 'Ponuda mora biti veca od 0 dinara';
      return;
    }
    this.posaoServis
      .azurirajPodatak(id, 'ponuda', this.ponuda)
      .subscribe((odgovor) => {
        this.posaoServis
          .azurirajPodatak(id, 'status', 'ponuda')
          .subscribe((odgovor) => {
            alert('Ponuda uspesno poslata!');
            window.location.reload();
          });
      });
  }

  skica(idO: string, idP: string) {
    let idSkica = this.objekti.find((objekat) => objekat._id == idO).idSkica;
    sessionStorage.setItem('idSkica', idSkica);
    sessionStorage.setItem('idPosao', idP);
    this.ruter.navigate(['/agencija/skica']);
  }

  vremenskiPeriod(posao: Posao): string {
    let pocetak = new Date(posao.pocetak);
    let kraj = new Date(posao.kraj);
    return (
      pocetak.getDate() +
      '.' +
      (pocetak.getMonth() + 1) +
      '.' +
      pocetak.getFullYear() +
      ' - ' +
      kraj.getDate() +
      '.' +
      (kraj.getMonth() + 1) +
      '.' +
      kraj.getFullYear()
    );
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  agencija: string = '';
  poslovi: Posao[] = [];
  klijenti: Klijent[] = [];
  objekti: Objekat[] = [];
  blokiraneAgencije: BlokiranaAgencija[] = [];

  brojZahteva: number = 0;
  brojAktivnih: number = 0;

  prihvacenaPonuda: boolean = false;
  ponuda: number = 0;
  izabranaAgencija: string = '';

  greska: string = '';
}
