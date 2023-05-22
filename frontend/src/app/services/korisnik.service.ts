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

  proveraLozinke(lozinka: string) {
    if (lozinka.length < 7 || lozinka.length > 12) {
      return 'Lozinka mora imati izmedju 7 i 12 karaktera';
    }

    const prviKarakter = lozinka.charAt(0);
    if (!/[a-zA-Z]/.test(prviKarakter)) {
      return 'Lozinka mora pocinjati slovom';
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&*_\-+=/|:;,.<>?]).*$/;
    if (!regex.test(lozinka)) {
      return 'Lozinka mora sadrzati bar jedno veliko slovo, jedan broj i jedan specijalni karakter';
    }

    return 'ok';
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
}
