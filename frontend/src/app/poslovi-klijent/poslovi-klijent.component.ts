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
import { SkicaService } from '../services/skica.service';

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
    private skicaServis: SkicaService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    let klijent = sessionStorage.getItem('korisnik');
    this.posaoServis
      .dohvatiPosloveKlijenta(klijent)
      .subscribe((poslovi: Posao[]) => {
        this.poslovi = poslovi;
        console.log(poslovi);
        this.izabraniPoslovi = poslovi;
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
        const objekat: Objekat = this.objekti.find(
          (objekat: Objekat) => objekat._id == posao.idObjekat
        );
        let boje = [];
        for (let i = 0; i < objekat.brProstorija; i++) {
          boje.push('white');
        }
        this.skicaServis.promeniBoju(objekat.idSkica, boje).subscribe((res) => {
          window.location.reload();
        });
      });
  }

  odbijPonudu(posao: Posao) {
    this.posaoServis.obrisiPosao(posao._id).subscribe((res) => {
      window.location.reload();
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

  izmeniPrikaz() {
    if (this.prikaz == 'sve') {
      this.izabraniPoslovi = this.poslovi;
    } else if (this.prikaz == 'zavrsen') {
      this.izabraniPoslovi = this.poslovi.filter(
        (posao: Posao) => posao.status == 'zavrsen'
      );
    } else if (this.prikaz == 'aktivan') {
      this.izabraniPoslovi = this.poslovi.filter(
        (posao: Posao) => posao.status == 'aktivan'
      );
    } else if (this.prikaz == 'zahtev') {
      this.izabraniPoslovi = this.poslovi.filter(
        (posao: Posao) =>
          posao.status == 'na cekanju' ||
          posao.status == 'ponuda' ||
          posao.status == 'odbijen'
      );
    }
  }

  boja(status: string): string {
    if (status == 'ponuda') {
      return 'green';
    } else if (status == 'odbijen') {
      return 'red';
    } else {
      return 'black';
    }
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

  poslovi: Posao[] = [];
  izabraniPoslovi: Posao[] = [];
  objekti: Objekat[] = [];
  recenzije: Recenzija[] = [];

  idPosao: string = '';
  komentar: string = '';
  ocena: number = 3;

  brojZavrsenihPoslova: number = 0;

  rezimIzmene: boolean = false;
  prikaz: string = 'sve';
}
