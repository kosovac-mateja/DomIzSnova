import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KlijentService } from '../services/klijent.service';
import { Klijent } from '../models/klijent';

@Component({
  selector: 'app-zaglavlje-klijent',
  templateUrl: './zaglavlje-klijent.component.html',
  styleUrls: ['./zaglavlje-klijent.component.css'],
})
export class ZaglavljeKlijentComponent implements OnInit {
  constructor(private ruter: Router, private klijentServis: KlijentService) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.klijentServis
      .dohvatiKlijenta(this.korisnickoIme)
      .subscribe((klijent: Klijent) => {
        this.slika = klijent.slika;
      });
  }

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }

  korisnickoIme: string;
  slika: string;
}
