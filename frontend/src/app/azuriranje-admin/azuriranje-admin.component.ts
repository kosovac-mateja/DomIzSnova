import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../services/klijent.service';
import { AgencijaService } from '../services/agencija.service';
import { Klijent } from '../models/klijent';
import { Agencija } from '../models/agencija';
import { Router } from '@angular/router';
import { ProveraService } from '../services/provera.service';

@Component({
  selector: 'app-azuriranje-admin',
  templateUrl: './azuriranje-admin.component.html',
  styleUrls: ['./azuriranje-admin.component.css'],
})
export class AzuriranjeAdminComponent implements OnInit {
  constructor(
    private klijentServis: KlijentService,
    private agencijaService: AgencijaService,
    private proveraServis: ProveraService,
    private ruter: Router
  ) {}

  ngOnInit(): void {
    this.korisnickoIme = sessionStorage.getItem('korisnickoIme');
    this.tip = sessionStorage.getItem('tip');
    if (this.tip == 'klijent') {
      this.klijentServis
        .dohvatiKlijenta(this.korisnickoIme)
        .subscribe((klijent: Klijent) => {
          this.telefon = klijent.telefon;
          this.mejl = klijent.mejl;
          this.slika = klijent.slika;
          this.ime = klijent.ime;
          this.prezime = klijent.prezime;
        });
    } else {
      this.agencijaService
        .dohvatiAgenciju(this.korisnickoIme)
        .subscribe((agencija: Agencija) => {
          this.telefon = agencija.telefon;
          this.mejl = agencija.mejl;
          this.slika = agencija.slika;
          this.naziv = agencija.naziv;
          this.ulica = agencija.ulica;
          this.grad = agencija.grad;
          this.drzava = agencija.drzava;
          this.maticniBroj = agencija.maticniBroj;
          this.opis = agencija.opis;
        });
    }
  }

  otpremanjeFajla(event) {
    var fajl = event.target.files[0];
    var citac = new FileReader();
    citac.readAsDataURL(fajl);
    citac.onload = () => {
      this.slika = citac.result as string;
    };
  }

  async azuriraj() {
    if (this.tip == 'klijent') {
      const klijent = {
        korisnickoIme: this.korisnickoIme,
        lozinka: '',
        telefon: this.telefon,
        mejl: this.mejl,
        slika: this.slika,
        ime: this.ime,
        prezime: this.prezime,
      };

      let provera = await this.proveraServis.proveraKlijent(klijent, true);
      if (provera != 'ok') {
        this.greska = provera;
        return;
      }

      this.klijentServis
        .azurirajKlijenta(
          this.korisnickoIme,
          this.telefon,
          this.mejl,
          this.slika,
          this.ime,
          this.prezime
        )
        .subscribe((odgovor) => {
          if (odgovor['poruka'] == 'ok') {
            alert('Uspesno ste azurirali podatke');
            this.ruter.navigate(['/admin']);
          } else {
            alert('Greska pri azuriranju podataka');
            this.ruter.navigate(['/admin']);
          }
        });
    } else {
      const agencija = {
        korisnickoIme: this.korisnickoIme,
        lozinka: '',
        telefon: this.telefon,
        mejl: this.mejl,
        slika: this.slika,
        naziv: this.naziv,
        ulica: this.ulica,
        grad: this.grad,
        drzava: this.drzava,
        maticniBroj: this.maticniBroj,
        opis: this.opis,
      };

      let provera = await this.proveraServis.proveraAgencija(agencija, true);
      if (provera != 'ok') {
        this.greska = provera;
        return;
      }
      this.agencijaService
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
        .subscribe((odgovor) => {
          if (odgovor['poruka'] == 'ok') {
            alert('Uspesno ste azurirali podatke');
            this.ruter.navigate(['/admin']);
          } else {
            alert('Greska pri azuriranju podataka');
            this.ruter.navigate(['/admin']);
          }
        });
    }
  }
  odustani() {
    this.ruter.navigate(['/admin']);
  }

  korisnickoIme: string;
  tip: string;

  telefon: string = '';
  mejl: string = '';
  slika: string = '';

  ime: string = '';
  prezime: string = '';

  naziv: string = '';
  ulica: string = '';
  grad: string = '';
  drzava: string = '';
  maticniBroj: string = '';
  opis: string = '';

  greska: string = '';
}
