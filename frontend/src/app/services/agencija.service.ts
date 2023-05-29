import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root',
})
export class AgencijaService {
  constructor(
    private http: HttpClient,
    private korisnikServis: KorisnikService
  ) {}

  url = 'http://localhost:4000';

  registracija(agencija) {
    const podaci = {
      korisnickoIme: agencija.korisnickoIme,
      telefon: agencija.telefon,
      mejl: agencija.mejl,
      slika: agencija.slika,
      naziv: agencija.naziv,
      ulica: agencija.ulica,
      grad: agencija.grad,
      drzava: agencija.drzava,
      maticniBroj: agencija.maticniBroj,
      opis: agencija.opis,
    };
    return this.http.post(`${this.url}/agencija/registracija`, podaci);
  }

  azurirajPodatak(korisnickoIme, podatak, vrednost) {
    return this.http.post(`${this.url}/agencija/azurirajPodatak`, {
      korisnickoIme: korisnickoIme,
      podatak: podatak,
      vrednost: vrednost,
    });
  }

  azurirajAgenciju(
    korisnickoIme,
    telefon,
    mejl,
    slika,
    naziv,
    ulica,
    grad,
    drzava,
    maticniBroj,
    opis
  ) {
    const agencija = {
      korisnickoIme: korisnickoIme,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
      naziv: naziv,
      ulica: ulica,
      grad: grad,
      drzava: drzava,
      maticniBroj: maticniBroj,
      opis: opis,
    };

    return this.http.post(`${this.url}/agencija/azurirajAgenciju`, agencija);
  }

  dohvatiAgenciju(korisnickoIme) {
    return this.http.post(`${this.url}/agencija/dohvatiAgenciju`, {
      korisnickoIme: korisnickoIme,
    });
  }

  dohvatiAgencije() {
    return this.http.get(`${this.url}/agencija/dohvatiAgencije`);
  }

  dohvatiAgencijePoNazivu(naziv) {
    return this.http.post(`${this.url}/agencija/dohvatiAgencijePoNazivu`, {
      naziv: naziv,
    });
  }

  dohvatiAgencijePoAdresi(adresa) {
    return this.http.post(`${this.url}/agencija/dohvatiAgencijePoAdresi`, {
      adresa: adresa,
    });
  }

  dohvatiAgencijePoNazivuIAdresi(naziv, adresa) {
    return this.http.post(
      `${this.url}/agencija/dohvatiAgencijePoNazivuIAdresi`,
      {
        naziv: naziv,
        adresa: adresa,
      }
    );
  }
}
