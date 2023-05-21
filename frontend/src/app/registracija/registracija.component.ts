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

  otpremanjeFajla(event) {
    var fajl = event.target.files[0];
    var citac = new FileReader();
    citac.readAsDataURL(fajl);
    citac.onload = () => {
      this.slika = citac.result as string;
    };
  }

  tip: string;
  korisnickoIme: string;
  lozinka: string;
  potvrdaLozinke: string;
  telefon: string;
  mejl: string;
  slika: string;

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
