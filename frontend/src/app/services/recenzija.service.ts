import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recenzija } from '../models/recenzija';

@Injectable({
  providedIn: 'root',
})
export class RecenzijaService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  dohvatiRecenzijeAgencije(agencija: string) {
    return this.http.post(`${this.url}/recenzije/dohvatiRecenzijeAgencije`, {
      agencija: agencija,
    });
  }

  dohvatiRecenzijeKlijenta(klijent: string) {
    return this.http.post(`${this.url}/recenzije/dohvatiRecenzijeKlijenta`, {
      klijent: klijent,
    });
  }

  ubaciRecenziju(
    idPosao: string,
    klijent: string,
    agencija: string,
    ocena: number,
    komentar: string
  ) {
    return this.http.post(`${this.url}/recenzije/ubaciRecenziju`, {
      idPosao: idPosao,
      klijent: klijent,
      agencija: agencija,
      ocena: ocena,
      komentar: komentar,
    });
  }

  azurirajRecenziju(idPosao: string, ocena: number, komentar: string) {
    return this.http.post(`${this.url}/recenzije/azurirajRecenziju`, {
      idPosao: idPosao,
      ocena: ocena,
      komentar: komentar,
    });
  }

  obrisiRecenziju(idPosao: string) {
    return this.http.post(`${this.url}/recenzije/obrisiRecenziju`, {
      idPosao: idPosao,
    });
  }
}
