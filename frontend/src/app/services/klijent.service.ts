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

  registracija(klijent) {
    const podaci = {
      korisnickoIme: klijent.korisnickoIme,
      telefon: klijent.telefon,
      mejl: klijent.mejl,
      slika: klijent.slika,
      ime: klijent.ime,
      prezime: klijent.prezime,
    };
    return this.http.post(`${this.url}/klijent/registracija`, podaci);
  }

  azurirajPodatak(korisnickoIme, podatak, vrednost) {
    return this.http.post(`${this.url}/klijent/azurirajPodatak`, {
      korisnickoIme: korisnickoIme,
      podatak: podatak,
      vrednost: vrednost,
    });
  }

  azurirajKlijenta(korisnickoIme, telefon, mejl, slika, ime, prezime) {
    const klijent = {
      korisnickoIme: korisnickoIme,
      telefon: telefon,
      mejl: mejl,
      slika: slika,
      ime: ime,
      prezime: prezime,
    };

    return this.http.post(`${this.url}/klijent/azurirajKlijenta`, klijent);
  }

  dohvatiKlijenta(korisnickoIme) {
    return this.http.post(`${this.url}/klijent/dohvatiKlijenta`, {
      korisnickoIme: korisnickoIme,
    });
  }
}
