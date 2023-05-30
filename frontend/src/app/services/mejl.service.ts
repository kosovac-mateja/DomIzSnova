import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrivremenaLozinka } from '../models/privremenaLozinka';

@Injectable({
  providedIn: 'root',
})
export class MejlService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  posaljiMejl(mejl: string) {
    return this.http.post(`${this.url}/mejl/posaljiMejl`, { mejl });
  }

  ubaciPrivremenuLozinku(korisnickoIme: string, lozinka: string) {
    return this.http.post(`${this.url}/mejl/ubaciPrivremenuLozinku`, {
      korisnickoIme,
      lozinka,
    });
  }

  async dohvatiPrivremenuLozinku(
    korisnickoIme: string
  ): Promise<PrivremenaLozinka> {
    return new Promise((resolve) => {
      this.http
        .post(`${this.url}/mejl/dohvatiPrivremenuLozinku`, { korisnickoIme })
        .subscribe((res: PrivremenaLozinka) => {
          resolve(res);
        });
    });
  }
}
