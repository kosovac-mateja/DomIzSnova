import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KorisnikService } from './korisnik.service';

@Injectable({
  providedIn: 'root',
})
export class KlijentService {
  constructor(
    private http: HttpClient,
    private korisnikServis: KorisnikService
  ) {}

  url = 'http://localhost:4000';

  async provera(klijent) {
    if (klijent.korisnickoIme == '') {
      return 'Korisnicko ime je obavezno polje';
    }
    if (
      (await this.korisnikServis.korisnikPostoji(klijent.korisnickoIme)) == true
    ) {
      return 'Korisnicko ime vec postoji';
    }
    if (klijent.lozinka == '') {
      return 'Lozinka je obavezno polje';
    }
    let provera = this.korisnikServis.proveraLozinke(klijent.lozinka);
    if (provera != 'ok') {
      return provera;
    }
    if (klijent.telefon == '') {
      return 'Telefon je obavezno polje';
    }
    if (klijent.mejl == '') {
      return 'Mejl je obavezno polje';
    }
    if (klijent.ime == '') {
      return 'Ime je obavezno polje';
    }
    if (klijent.prezime == '') {
      return 'Prezime je obavezno polje';
    }

    return 'ok';
  }

  registracija(klijent) {
    return this.http.post(`${this.url}/klijent/registracija`, klijent);
  }
}
