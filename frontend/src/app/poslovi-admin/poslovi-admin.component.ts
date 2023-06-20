import { Component, OnInit } from '@angular/core';
import { Posao } from '../models/posao';
import { PosaoService } from '../services/posao.service';
import { OtkazivanjePosla } from '../models/otkazivanjePosla';
import { AgencijaService } from '../services/agencija.service';
import { RadnikService } from '../services/radnik.service';
import { BlokiranjeService } from '../services/blokiranje.service';
import { Agencija } from '../models/agencija';
import { Radnik } from '../models/radnik';

@Component({
  selector: 'app-poslovi-admin',
  templateUrl: './poslovi-admin.component.html',
  styleUrls: ['./poslovi-admin.component.css'],
})
export class PosloviAdminComponent implements OnInit {
  constructor(
    private posaoServis: PosaoService,
    private agencijaServis: AgencijaService,
    private radnikServis: RadnikService,
    private blokiranjeServis: BlokiranjeService
  ) {}

  ngOnInit(): void {
    this.posaoServis.dohvatiPoslove().subscribe((poslovi: Posao[]) => {
      this.poslovi = poslovi;
    });
    this.posaoServis
      .dohvatiOtkazivanja()
      .subscribe((otkazivanja: OtkazivanjePosla[]) => {
        this.otkazivanja = otkazivanja;
      });
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

  prihvatiOtkazivanje(idPosao: string) {
    let korisnickoIme = '';
    this.posaoServis.dohvatiPosao(idPosao).subscribe((posao: Posao) => {
      korisnickoIme = posao.agencija;
      console.log(korisnickoIme);
      this.agencijaServis
        .dohvatiAgenciju(korisnickoIme)
        .subscribe((agencija: Agencija) => {
          if (agencija.brojOtkazanih == 3) {
            this.blokiranjeServis
              .ubaci(korisnickoIme)
              .subscribe((odgovor) => {});
            this.agencijaServis
              .azurirajPodatak(korisnickoIme, 'brojOtkazanih', 0)
              .subscribe((odgovor) => {});
          } else {
            this.agencijaServis
              .otkaziPosao(korisnickoIme)
              .subscribe((odgovor) => {});
          }
        });
    });
    this.posaoServis
      .promeniStatus(idPosao, 'prihvacen')
      .subscribe((odgovor) => {
        this.posaoServis
          .azurirajPodatak(idPosao, 'status', 'otkazan')
          .subscribe((odgovor) => {
            this.ngOnInit();
          });
      });
    this.radnikServis
      .dohvatiRadnikeNaPoslu(idPosao)
      .subscribe((radnici: Radnik[]) => {
        radnici.forEach((radnik) => {
          this.radnikServis
            .azurirajPosaoRadnika(radnik._id, null)
            .subscribe((odgovor) => {});
        });
      });
  }

  odbijOtkazivanje(idPosao: string) {
    this.posaoServis.promeniStatus(idPosao, 'odbijen').subscribe((odgovor) => {
      this.ngOnInit();
    });
  }

  posao(otkazivanje: OtkazivanjePosla) {
    return this.poslovi.find((posao) => posao._id == otkazivanje.idPosao);
  }

  poslovi: Posao[] = [];
  otkazivanja: OtkazivanjePosla[] = [];
}
