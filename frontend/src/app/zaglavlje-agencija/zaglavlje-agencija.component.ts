import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-zaglavlje-agencija',
  templateUrl: './zaglavlje-agencija.component.html',
  styleUrls: ['./zaglavlje-agencija.component.css'],
})
export class ZaglavljeAgencijaComponent implements OnInit {
  constructor(private ruter: Router, private agencijaServis: AgencijaService) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.agencijaServis
      .dohvatiAgenciju(this.korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.slika = agencija.slika;
      });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }
  korisnickoIme: string;
  slika: string;
}
