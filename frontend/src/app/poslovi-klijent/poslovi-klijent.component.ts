import { Component, OnInit } from '@angular/core';
import { PosaoService } from '../services/posao.service';
import { Posao } from '../models/posao';
import { ObjekatService } from '../services/objekat.service';
import { Objekat } from '../models/objekat';
import { Router } from '@angular/router';
import { RecenzijaService } from '../services/recenzija.service';
import { Recenzija } from '../models/recenzija';
import { BlokiranjeService } from '../services/blokiranje.service';
import { BlokiranaAgencija } from '../models/blokiranaAgencija';

@Component({
  selector: 'app-poslovi-klijent',
  templateUrl: './poslovi-klijent.component.html',
  styleUrls: ['./poslovi-klijent.component.css'],
})
export class PosloviKlijentComponent implements OnInit {
  constructor(
    private posaoServis: PosaoService,
    private objekatServis: ObjekatService,
    private recenzijaServis: RecenzijaService,
    private blokiranjeServis: BlokiranjeService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    let klijent = sessionStorage.getItem('korisnik');
    this.posaoServis
      .dohvatiPosloveKlijenta(klijent)
      .subscribe((poslovi: Posao[]) => {
        this.poslovi = poslovi;
        poslovi.forEach((p) => {
          if (p.status == 'zavrsen') {
            this.brojZavrsenihPoslova++;
          }
        });
      });
    this.objekatServis
      .dohvatiObjekteVlasnika(klijent)
      .subscribe((objekti: Objekat[]) => {
        this.objekti = objekti;
      });
    this.recenzijaServis
      .dohvatiRecenzijeKlijenta(klijent)
      .subscribe((recenzije: Recenzija[]) => {
        this.recenzije = recenzije;
      });
  }

  dohvatiObjekat(id: string): string {
    for (let objekat of this.objekti) {
      if (objekat._id == id) return objekat.adresa + ', ' + objekat.tip;
    }
    return null;
  }

  prihvatiPonudu(posao: Posao) {
    this.posaoServis
      .azurirajPodatak(posao._id, 'status', 'aktivan')
      .subscribe((res) => {
        posao.status = 'aktivan';
      });
  }

  odbijPonudu(posao: Posao) {
    this.posaoServis.obrisiPosao(posao._id).subscribe((res) => {
      this.poslovi = this.poslovi.filter((p) => p._id != posao._id);
    });
  }

  skica(posao: Posao) {
    this.objekti.find((objekat: Objekat) => {
      if (objekat._id == posao.idObjekat) {
        sessionStorage.setItem('idSkica', objekat.idSkica);
        sessionStorage.setItem('idPosao', posao._id);
        this.ruter.navigate(['/klijent/skica']);
      }
    });
  }

  postojiRecenzija(idPosao: string): boolean {
    if (
      this.recenzije.find(
        (recenzija: Recenzija) => recenzija.idPosao == idPosao
      )
    ) {
      return true;
    }

    return false;
  }

  ostaviRecenziju() {
    let posao = this.poslovi.find((posao: Posao) => posao._id == this.idPosao);
    if (this.ocena > 3) {
      this.blokiranjeServis
        .dohvatiAgenciju(posao.agencija)
        .subscribe((blokiranaAgencija: BlokiranaAgencija) => {
          if (blokiranaAgencija != null) {
            console.log(blokiranaAgencija);
            if (blokiranaAgencija.brojPozitivnihOcena == 1) {
              this.blokiranjeServis
                .izbrisi(posao.agencija)
                .subscribe((res) => {});
            } else {
              this.blokiranjeServis
                .dodajPozitivnuOcenu(posao.agencija)
                .subscribe((res) => {});
            }
          }
        });
    }
    this.recenzijaServis
      .ubaciRecenziju(
        posao._id,
        posao.klijent,
        posao.agencija,
        this.ocena,
        this.komentar
      )
      .subscribe((res) => {
        this.recenzije.push({
          idPosao: posao._id,
          klijent: posao.klijent,
          agencija: posao.agencija,
          ocena: this.ocena,
          komentar: this.komentar,
        });
        alert('Recenzija uspešno ostavljena!');
        this.idPosao = '';
        this.komentar = '';
        this.ocena = 3;
      });
  }

  azurirajRecenziju(recenzija: Recenzija) {
    console.log(recenzija);
    this.recenzijaServis
      .azurirajRecenziju(recenzija.idPosao, recenzija.ocena, recenzija.komentar)
      .subscribe((res) => {
        alert('Recenzija uspešno ažurirana!');
      });
    this.rezimIzmene = false;
  }

  obrisiRecenziju(recenzija: Recenzija) {
    this.recenzijaServis.obrisiRecenziju(recenzija.idPosao).subscribe((res) => {
      this.recenzije = this.recenzije.filter(
        (r) => r.idPosao != recenzija.idPosao
      );
      alert('Recenzija obrisana');
    });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  poslovi: Posao[] = [];
  objekti: Objekat[] = [];
  recenzije: Recenzija[] = [];

  idPosao: string = '';
  komentar: string = '';
  ocena: number = 3;

  brojZavrsenihPoslova: number = 0;

  rezimIzmene: boolean = false;
}
