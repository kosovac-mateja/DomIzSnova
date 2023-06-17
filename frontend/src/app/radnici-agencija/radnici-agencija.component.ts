import { Component, OnInit } from '@angular/core';
import { RadnikService } from '../services/radnik.service';
import { Radnik } from '../models/radnik';
import { Agencija } from '../models/agencija';
import { AgencijaService } from '../services/agencija.service';
import { ProveraService } from '../services/provera.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-radnici-agencija',
  templateUrl: './radnici-agencija.component.html',
  styleUrls: ['./radnici-agencija.component.css'],
})
export class RadniciAgencijaComponent implements OnInit {
  constructor(
    private radnikServis: RadnikService,
    private agencijaServis: AgencijaService,
    private proveraServis: ProveraService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    let korisnickoIme = sessionStorage.getItem('korisnik');

    this.agencijaServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.agencija = agencija;
      });

    this.radnikServis
      .dohvatiRadnikeAgencije(korisnickoIme)
      .subscribe((radnici: Radnik[]) => {
        this.radnici = radnici;
      });
  }

  obrisiRadnika(radnik: Radnik) {
    this.radnikServis.obrisiRadnika(radnik._id).subscribe((radnik: Radnik) => {
      this.radnikServis
        .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
        .subscribe((radnici: Radnik[]) => {
          this.radnici = radnici;
        });
    });
  }

  izmeniRadnika(radnik: Radnik) {
    this.radnikServis.azurirajRadnika(radnik).subscribe((radnik: Radnik) => {
      this.radnikServis
        .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
        .subscribe((radnici: Radnik[]) => {
          this.radnici = radnici;
        });
    });
    this.rezimIzmene = false;
  }

  async dodajRadnika() {
    const radnik = {
      telefon: this.telefon,
      mejl: this.mejl,
      ime: this.ime,
      prezime: this.prezime,
    };

    let provera = await this.proveraServis.proveraRadnik(radnik);
    if (provera != 'ok') {
      this.greska = provera;
      return;
    }
    this.radnikServis
      .dodajRadnika(
        this.ime,
        this.prezime,
        this.mejl,
        this.telefon,
        this.specijalizacija,
        this.agencija.korisnickoIme
      )
      .subscribe((radnik: Radnik) => {
        alert('Uspesno ste dodali radnika!');
        this.radnikServis
          .dohvatiRadnikeAgencije(this.agencija.korisnickoIme)
          .subscribe((radnici: Radnik[]) => {
            this.radnici = radnici;
          });
      });

    this.ime = '';
    this.prezime = '';
    this.mejl = '';
    this.telefon = '';
    this.specijalizacija = '';
    this.greska = '';
  }

  posaljiZahtev() {
    if (this.agencija.zahtev != 0) {
      alert(
        'Vec ste poslali zahtev za prosirenje broja radnih mesta!\nAdministratori ce uskoro razmotriti vas zahtev'
      );
      return;
    }
    this.agencijaServis
      .azurirajPodatak(this.agencija.korisnickoIme, 'zahtev', this.prosirenje)
      .subscribe((res) => {
        alert('Uspesno ste poslali zahtev za povecanje broja radnih mesta!');
        this.prosirenje = 0;
      });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  radnici: Radnik[] = [];
  agencija: Agencija = new Agencija();

  rezimIzmene: boolean = false;

  ime: string = '';
  prezime: string = '';
  mejl: string = '';
  telefon: string = '';
  specijalizacija: string = '';

  prosirenje: number = 0;

  greska: string = '';
}
