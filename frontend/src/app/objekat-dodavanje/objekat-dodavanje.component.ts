import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objekat-dodavanje',
  templateUrl: './objekat-dodavanje.component.html',
  styleUrls: ['./objekat-dodavanje.component.css'],
})
export class ObjekatDodavanjeComponent implements OnInit {
  constructor(private ruter: Router) {}

  ngOnInit(): void {}

  dalje() {
    localStorage.setItem('dodavanjeObjektaTip', this.tip);
    localStorage.setItem('dodavanjeObjektaAdresa', this.adresa);
    localStorage.setItem(
      'dodavanjeObjektaBrProstorija',
      this.brProstorija.toString()
    );
    localStorage.setItem(
      'dodavanjeObjektaKvadratura',
      this.kvadratura.toString()
    );
    this.ruter.navigate(['/klijent/dodajObjekat/skica']);
  }

  tip: string = 'stan';
  adresa: string = '';
  brProstorija: number = 1;
  kvadratura: number = 0;
}
