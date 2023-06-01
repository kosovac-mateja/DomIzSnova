import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
