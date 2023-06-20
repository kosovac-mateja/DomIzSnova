import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PosaoService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  ubaciPosao(
    klijent: string,
    agencija: string,
    idObjekat: string,
    status: string,
    prekid: boolean,
    pocetak: Date,
    kraj: Date
  ) {
    const posao = {
      klijent: klijent,
      agencija: agencija,
      idObjekat: idObjekat,
      status: status,
      prekid: prekid,
      pocetak: pocetak,
      kraj: kraj,
      ponuda: 0,
    };

    return this.http.post(`${this.url}/posao/ubaciPosao`, posao);
  }

  dohvatiPosloveKlijenta(klijent: string) {
    return this.http.post(`${this.url}/posao/dohvatiPosloveKlijenta`, {
      klijent: klijent,
    });
  }

  dohvatiPosloveAgencije(agencija: string) {
    return this.http.post(`${this.url}/posao/dohvatiPosloveAgencije`, {
      agencija: agencija,
    });
  }

  azurirajPodatak(id, podatak, vrednost) {
    return this.http.post(`${this.url}/posao/azurirajPodatak`, {
      id: id,
      podatak: podatak,
      vrednost: vrednost,
    });
  }

  obrisiPosao(id) {
    return this.http.post(`${this.url}/posao/obrisiPosao`, { id: id });
  }

  otkaziPosao(idPosao, razlog) {
    return this.http.post(`${this.url}/otkazivanjePosla/ubaci`, {
      idPosao: idPosao,
      razlog: razlog,
      status: 'na cekanju',
    });
  }

  dohvatiOtkazivanja() {
    return this.http.get(`${this.url}/otkazivanjePosla/dohvatiOtkazivanja`);
  }

  promeniStatus(idPosao, status) {
    return this.http.post(`${this.url}/otkazivanjePosla/promeniStatus`, {
      idPosao: idPosao,
      status: status,
    });
  }

  zahtevPostoji(idPosao) {
    return this.http.post(`${this.url}/otkazivanjePosla/zahtevPostoji`, {
      idPosao: idPosao,
    });
  }

  dohvatiPosao(idPosao: string) {
    return this.http.post(`${this.url}/posao/dohvatiPosao`, {
      id: idPosao,
    });
  }

  dohvatiPoslove() {
    return this.http.get(`${this.url}/posao/dohvatiPoslove`);
  }
}
