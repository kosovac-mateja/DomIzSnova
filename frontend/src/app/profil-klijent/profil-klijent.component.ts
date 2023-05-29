import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { KlijentService } from '../services/klijent.service';
import { Korisnik } from '../models/korisnik';
import { Klijent } from '../models/klijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-klijent',
  templateUrl: './profil-klijent.component.html',
  styleUrls: ['./profil-klijent.component.css'],
})
export class ProfilKlijentComponent implements OnInit {
  constructor(private klijentServis: KlijentService, private ruter: Router) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnik');
    this.klijentServis
      .dohvatiKlijenta(this.korisnickoIme)
      .subscribe((klijent: Klijent) => {
        this.ime = klijent.ime;
        this.prezime = klijent.prezime;
        this.mejl = klijent.mejl;
        this.telefon = klijent.telefon;
        this.slika = klijent.slika;
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
    this.klijentServis
      .azurirajKlijenta(
        this.korisnickoIme,
        this.telefon,
        this.mejl,
        this.slika,
        this.ime,
        this.prezime
      )
      .subscribe((res) => {
        if (res['poruka'] == 'ok') {
          alert('Uspešno ste ažurirali profil.');
        } else {
          alert('Greška pri ažuriranju profila.');
        }
        this.ruter.navigate(['/klijent']);
      });
  }

  odustani() {
    this.ruter.navigate(['/klijent']);
  }

  korisnickoIme: string;
  ime: string;
  prezime: string;
  mejl: string;
  telefon: string;
  slika: string;
}
