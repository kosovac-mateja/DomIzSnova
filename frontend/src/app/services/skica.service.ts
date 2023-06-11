import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Koordinata } from '../models/koordinata';
import { Dimenzije } from '../models/dimenzije';

@Injectable({
  providedIn: 'root',
})
export class SkicaService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  ubaciSkicu(
    koord: Koordinata[],
    dim: Dimenzije[],
    boje: string[],
    vrata: Koordinata[]
  ) {
    return this.http.post(`${this.url}/skica/ubaciSkicu`, {
      koordinate: koord,
      dimenzije: dim,
      boje: boje,
      koordinateVrata: vrata,
    });
  }

  dohvatiSkicu(id) {
    return this.http.post(`${this.url}/skica/dohvatiSkicu`, { id: id });
  }

  promeniBoju(id, boje) {
    return this.http.post(`${this.url}/skica/promeniBoju`, {
      id: id,
      boje: boje,
    });
  }
}
