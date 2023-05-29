import { Component, OnInit } from '@angular/core';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-profil-agencija',
  templateUrl: './profil-agencija.component.html',
  styleUrls: ['./profil-agencija.component.css'],
})
export class ProfilAgencijaComponent implements OnInit {
  constructor(private agencijaServis: AgencijaService, private ruter: Router) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.agencijaServis
      .dohvatiAgenciju(this.korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.naziv = agencija.naziv;
        this.opis = agencija.opis;
        this.mejl = agencija.mejl;
        this.telefon = agencija.telefon;
        this.slika = agencija.slika;
        this.ulica = agencija.ulica;
        this.grad = agencija.grad;
        this.drzava = agencija.drzava;
        this.maticniBroj = agencija.maticniBroj;
      });
  }

  otpremanjeFajla(event) {
    var fajl = event.target.files[0];
    var citac = new FileReader();
    citac.readAsDataURL(fajl);
    citac.onload = () => {
      this.slika = citac.result as string;
    };
  }

  azuriraj() {
    this.agencijaServis
      .azurirajAgenciju(
        this.korisnickoIme,
        this.telefon,
        this.mejl,
        this.slika,
        this.naziv,
        this.ulica,
        this.grad,
        this.drzava,
        this.maticniBroj,
        this.opis
      )
      .subscribe((res) => {
        if (res['poruka'] == 'ok') {
          alert('Uspešno ste ažurirali profil.');
        } else {
          alert('Greška pri ažuriranju profila.');
        }
        this.ruter.navigate(['/agencija']);
      });
  }

  odustani() {
    this.ruter.navigate(['agencija']);
  }

  korisnickoIme: string;
  naziv: string;
  opis: string;
  mejl: string;
  telefon: string;
  slika: string;
  ulica: string;
  grad: string;
  drzava: string;
  maticniBroj: string;
}
