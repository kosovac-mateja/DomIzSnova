import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlokiranjeService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  ubaci(korisnickoIme: string) {
    const data = {};

    return this.http.post(`${this.url}/blokiranje/ubaci`, {
      korisnickoIme: korisnickoIme,
      brojPozitivnihOcena: 0,
    });
  }

  dohvatiAgenciju(korisnickoIme: string) {
    return this.http.post(`${this.url}/blokiranje/dohvatiAgenciju`, {
      korisnickoIme: korisnickoIme,
    });
  }

  izbrisi(korisnickoIme: string) {
    return this.http.post(`${this.url}/blokiranje/izbrisi`, {
      korisnickoIme: korisnickoIme,
    });
  }

  startuj() {
    return this.http.get(`${this.url}/blokiranje/startuj`);
  }

  dodajPozitivnuOcenu(korisnickoIme: string) {
    return this.http.post(`${this.url}/blokiranje/dodajPozitivnuOcenu`, {
      korisnickoIme: korisnickoIme,
    });
  }

  dohvatiSve() {
    return this.http.get(`${this.url}/blokiranje/dohvatiSve`);
  }
}
