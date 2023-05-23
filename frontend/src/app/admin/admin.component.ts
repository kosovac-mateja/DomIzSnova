import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { KlijentService } from '../services/klijent.service';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private klijentServis: KlijentService,
    private agencijaServis: AgencijaService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.korisnikServis
      .dohvatiKorisnike()
      .subscribe((korisnici: Korisnik[]) => {
        this.korisnici = korisnici;
      });
  }

  prihvati(korisnickoIme) {
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

  odbij(korisnickoIme) {
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

  korisnici: Korisnik[] = [];
}
