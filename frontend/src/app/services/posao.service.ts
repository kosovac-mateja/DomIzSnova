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
    vremenskiPeriod: string
  ) {
    const posao = {
      klijent: klijent,
      agencija: agencija,
      idObjekat: idObjekat,
      status: status,
      prekid: prekid,
      vremenskiPeriod: vremenskiPeriod,
    };

    return this.http.post(`${this.url}/posao/ubaciPosao`, posao);
  }

  dohvatiPosloveKlijenta(klijent: string) {
    return this.http.post(`${this.url}/posao/dohvatiPosloveKlijenta`, {
      klijent: klijent,
    });
  }
}
