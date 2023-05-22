import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:4000';

  dohvatiAdmine() {
    return this.http.get(`${this.url}/admin/dohvatiSve`);
  }
}
