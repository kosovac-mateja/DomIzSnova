import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
})
export class RegistracijaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  registracija() {
    //TODO: implementirati
  }

  tip: string;

  korisnickoIme: string;
  lozinka: string;
  potvrdaLozinke: string;
  telefon: string;
  mejl: string;

  ime: string;
  prezime: string;

  naziv: string;
  ulica: string;
  grad: string;
  drzava: string;
  maticniBroj: string;
  opis: string;

  greska: string = '';
}
