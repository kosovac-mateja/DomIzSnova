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
    sessionStorage.setItem('dodavanjeObjektaTip', this.tip);
    sessionStorage.setItem('dodavanjeObjektaAdresa', this.adresa);
    sessionStorage.setItem(
      'dodavanjeObjektaBrProstorija',
      this.brProstorija.toString()
    );
    sessionStorage.setItem(
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
