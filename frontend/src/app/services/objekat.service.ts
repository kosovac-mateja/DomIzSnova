import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Objekat } from '../models/objekat';

@Injectable({
  providedIn: 'root',
})
export class ObjekatService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  dohvatiObjekteVlasnika(vlasnik: string) {
    return this.http.post(`${this.url}/objekat/dohvatiObjekteVlasnika`, {
      vlasnik: vlasnik,
    });
  }

  obrisiObjekat(id: string) {
    return this.http.post(`${this.url}/objekat/obrisiObjekat`, { id: id });
  }

  dodajObjekat(
    tip: string,
    adresa: string,
    brProstorija: number,
    kvadratura: number,
    idSkica: string,
    vlasnik: string
  ) {
    return this.http.post(`${this.url}/objekat/dodajObjekat`, {
      tip: tip,
      adresa: adresa,
      brProstorija: brProstorija,
      kvadratura: kvadratura,
      idSkica: idSkica,
      vlasnik: vlasnik,
    });
  }

  azurirajObjekat(objekat: Objekat) {
    return this.http.post(`${this.url}/objekat/azurirajObjekat`, {
      _id: objekat._id,
      tip: objekat.tip,
      adresa: objekat.adresa,
      brProstorija: objekat.brProstorija,
      kvadratura: objekat.kvadratura,
      idSkica: objekat.idSkica,
      vlasnik: objekat.vlasnik,
    });
  }

  dohvatiObjekat(id: string) {
    return this.http.post(`${this.url}/objekat/dohvatiObjekat`, { id: id });
  }
}
