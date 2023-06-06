import { Component, OnInit } from '@angular/core';
import { PosaoService } from '../services/posao.service';
import { Posao } from '../models/posao';
import { ObjekatService } from '../services/objekat.service';
import { Objekat } from '../models/objekat';

@Component({
  selector: 'app-poslovi-klijent',
  templateUrl: './poslovi-klijent.component.html',
  styleUrls: ['./poslovi-klijent.component.css'],
})
export class PosloviKlijentComponent implements OnInit {
  constructor(
    private posaoServis: PosaoService,
    private objekatServis: ObjekatService
  ) {}

  ngOnInit(): void {
    let klijent = sessionStorage.getItem('korisnik');
    this.posaoServis
      .dohvatiPosloveKlijenta(klijent)
      .subscribe((poslovi: Posao[]) => {
        this.poslovi = poslovi;
      });
    this.objekatServis
      .dohvatiObjekteVlasnika(klijent)
      .subscribe((objekti: Object[]) => {
        this.objekti = objekti;
      });
  }

  dohvatiObjekat(id: string): string {
    for (let objekat of this.objekti) {
      if (objekat['_id'] == id)
        return objekat['adresa'] + ', ' + objekat['tip'];
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

  otkaziPosao(posao: Posao) {
    //TODO: otkazivanje posla
  }

  poslovi: Posao[] = [];
  objekti: Object[] = [];
}
