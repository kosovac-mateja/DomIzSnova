import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
