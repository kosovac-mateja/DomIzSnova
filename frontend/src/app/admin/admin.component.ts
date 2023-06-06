import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { KlijentService } from '../services/klijent.service';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';
import { PosaoService } from '../services/posao.service';
import { OtkazivanjePosla } from '../models/otkazivanjePosla';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private posaoServis: PosaoService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.korisnikServis
      .dohvatiKorisnike()
      .subscribe((korisnici: Korisnik[]) => {
        this.korisnici = korisnici;
      });
    this.posaoServis
      .dohvatiOtkazivanja()
      .subscribe((otkazivanja: OtkazivanjePosla[]) => {
        this.otkazivanja = otkazivanja;
      });
  }

  prihvatiRegistraciju(korisnickoIme) {
    this.korisnikServis
      .azurirajStatus(korisnickoIme, 'prihvacen')
      .subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          this.korisnikServis
            .dohvatiKorisnike()
            .subscribe((korisnici: Korisnik[]) => {
              this.korisnici = korisnici;
            });
        }
      });
  }

  odbijRegistraciju(korisnickoIme) {
    this.korisnikServis
      .azurirajStatus(korisnickoIme, 'odbijen')
      .subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          this.korisnikServis
            .dohvatiKorisnike()
            .subscribe((korisnici: Korisnik[]) => {
              this.korisnici = korisnici;
            });
        }
      });
  }

  azuriraj(korisnickoIme, tip) {
    sessionStorage.setItem('korisnickoIme', korisnickoIme);
    sessionStorage.setItem('tip', tip);

    this.ruter.navigate(['/admin/azuriranje']);
  }

  obrisi(korisnickoIme) {
    this.korisnikServis.obrisiKorisnika(korisnickoIme).subscribe((odgovor) => {
      if (odgovor['poruka'] == 'ok') {
        this.korisnikServis
          .dohvatiKorisnike()
          .subscribe((korisnici: Korisnik[]) => {
            this.korisnici = korisnici;
          });
      }
    });
  }

  agencijaRadnici(korisnickoIme: string) {
    sessionStorage.setItem('agencijaRadnici', korisnickoIme);
    this.ruter.navigate(['/admin/radnici']);
  }

  prihvatiOtkazivanje(idPosao: string) {
    this.posaoServis
      .promeniStatus(idPosao, 'prihvacen')
      .subscribe((odgovor) => {
        this.posaoServis
          .azurirajPodatak(idPosao, 'status', 'otkazan')
          .subscribe((odgovor) => {
            this.ngOnInit();
          });
      });
  }

  odbijOtkazivanje(idPosao: string) {
    this.posaoServis.promeniStatus(idPosao, 'odbijen').subscribe((odgovor) => {
      this.ngOnInit();
    });
  }

  korisnici: Korisnik[] = [];
  otkazivanja: OtkazivanjePosla[] = [];
}
