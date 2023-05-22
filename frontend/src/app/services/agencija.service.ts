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

  async provera(agencija) {
    if (agencija.korisnickoIme == '') {
      return 'Korisnicko ime je obavezno polje';
    }
    if (await this.korisnikServis.korisnikPostoji(agencija.korisnickoIme)) {
      return 'Korisnicko ime vec postoji';
    }
    if (agencija.lozinka == '') {
      return 'Lozinka je obavezno polje';
    }
    let provera = this.korisnikServis.proveraLozinke(agencija.lozinka);
    if (provera != 'ok') {
      return provera;
    }
    if (agencija.telefon == '') {
      return 'Telefon je obavezno polje';
    }
    if (agencija.mejl == '') {
      return 'Mejl je obavezno polje';
    }
    if (agencija.naziv == '') {
      return 'Naziv je obavezno polje';
    }
    if (agencija.ulica == '') {
      return 'Ulica je obavezno polje';
    }
    if (agencija.grad == '') {
      return 'Grad je obavezno polje';
    }
    if (agencija.drzava == '') {
      return 'Drzava je obavezno polje';
    }
    if (agencija.maticniBroj == '') {
      return 'Maticni broj je obavezno polje';
    }
    if (agencija.opis == '') {
      return 'Opis je obavezno polje';
    }

    return 'ok';
  }

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
}
