import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { AgencijaService } from '../services/agencija.service';
import { KlijentService } from '../services/klijent.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { Klijent } from '../models/klijent';
import { Agencija } from '../models/agencija';
import { BlokiranaAgencija } from '../models/blokiranaAgencija';
import { BlokiranjeService } from '../services/blokiranje.service';

@Component({
  selector: 'app-korisnici-admin',
  templateUrl: './korisnici-admin.component.html',
  styleUrls: ['./korisnici-admin.component.css'],
})
export class KorisniciAdminComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private agencijaServis: AgencijaService,
    private klijentServis: KlijentService,
    private blokiranjeServis: BlokiranjeService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.korisnikServis
      .dohvatiKorisnike()
      .subscribe((korisnici: Korisnik[]) => {
        korisnici.forEach((korisnik) => {
          if (korisnik.status == 'prihvacen') {
            this.registrovaniKorisnici.push(korisnik);
          } else if (korisnik.status == 'na cekanju') {
            this.registracijaZahtevi.push(korisnik);
          }
        });
        this.agencijaServis
          .dohvatiAgencije()
          .subscribe((agencije: Agencija[]) => {
            agencije.forEach((agencija) => {
              if (
                this.registrovaniKorisnici.find(
                  (korisnik) => korisnik.korisnickoIme == agencija.korisnickoIme
                )
              ) {
                this.agencije.push(agencija);
              }
            });
          });
        this.klijentServis
          .dohvatiKlijente()
          .subscribe((klijenti: Klijent[]) => {
            klijenti.forEach((klijent) => {
              if (
                this.registrovaniKorisnici.find(
                  (korisnik) => korisnik.korisnickoIme == klijent.korisnickoIme
                )
              ) {
                this.klijenti.push(klijent);
              }
            });
          });
      });
    this.blokiranjeServis
      .dohvatiSve()
      .subscribe((blokiranja: BlokiranaAgencija[]) => {
        this.blokiraneAgencije = blokiranja;
      });
  }

  prihvatiRegistraciju(korisnickoIme) {
    this.korisnikServis
      .azurirajStatus(korisnickoIme, 'prihvacen')
      .subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          window.location.reload();
        }
      });
  }

  odbijRegistraciju(korisnickoIme) {
    this.korisnikServis
      .azurirajStatus(korisnickoIme, 'odbijen')
      .subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          window.location.reload();
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
        window.location.reload();
      }
    });
  }

  agencijaRadnici(korisnickoIme: string) {
    sessionStorage.setItem('agencijaRadnici', korisnickoIme);
    this.ruter.navigate(['/admin/radnici']);
  }

  dodajKorisnika() {
    this.ruter.navigate(['/admin/registracija']);
  }

  odblokirajAgenciju(korisnickoIme: string) {
    this.blokiranjeServis.izbrisi(korisnickoIme).subscribe((odgovor) => {
      this.ngOnInit();
    });
  }

  registrovaniKorisnici: Korisnik[] = [];
  registracijaZahtevi: Korisnik[] = [];
  klijenti: Klijent[] = [];
  agencije: Agencija[] = [];
  blokiraneAgencije: BlokiranaAgencija[] = [];

  prikaz: string = 'zahtev';
}
