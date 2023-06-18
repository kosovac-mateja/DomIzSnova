import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KorisnikService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  ubaciKorisnika(korisnickoIme, lozinka, tip) {
    const korisnik = {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
      tip: tip,
      status: 'na cekanju',
    };

    return this.http.post(`${this.url}/korisnik/ubaci`, korisnik);
  }

  dohvatiKorisnike() {
    return this.http.get(`${this.url}/korisnik/dohvatiKorisnike`);
  }

  dohvatiKorisnika(korisnickoIme) {
    return this.http.post(`${this.url}/korisnik/dohvatiKorisnika`, {
      korisnickoIme: korisnickoIme,
    });
  }

  async korisnikPostoji(korisnickoIme): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .post(`${this.url}/korisnik/korisnikPostoji`, {
          korisnickoIme: korisnickoIme,
        })
        .subscribe((res) => {
          if (res['postoji'] == 'da') {
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  azurirajStatus(korisnickoIme, vrednost) {
    return this.http.post(`${this.url}/korisnik/azurirajStatus`, {
      korisnickoIme: korisnickoIme,
      vrednost: vrednost,
    });
  }

  obrisiKorisnika(korisnickoIme) {
    return this.http.post(`${this.url}/korisnik/obrisi`, {
      korisnickoIme: korisnickoIme,
    });
  }

  azurirajLozinku(korisnickoIme, lozinka) {
    return this.http.post(`${this.url}/korisnik/azurirajLozinku`, {
      korisnickoIme: korisnickoIme,
      lozinka: lozinka,
    });
  }
}
