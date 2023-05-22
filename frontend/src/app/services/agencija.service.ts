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

  provera(agencija) {
    if (agencija.korisnickoIme == '') {
      return 'Korisnicko ime je obavezno polje';
    }
    if (this.korisnikServis.korisnikPostoji(agencija.korisnickoIme)) {
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
    return this.http.post(`${this.url}/agencija/registracija`, agencija);
  }
}
