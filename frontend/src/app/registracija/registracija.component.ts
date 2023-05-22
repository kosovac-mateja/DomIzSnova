import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { KlijentService } from '../services/klijent.service';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
})
export class RegistracijaComponent implements OnInit {
  constructor(
    private korisnikServis: KorisnikService,
    private klijentServis: KlijentService,
    private agencijaKlijent: AgencijaService,
    private ruter: Router
  ) {}

  ngOnInit(): void {}

  async registracija() {
    if (this.lozinka != this.potvrdaLozinke) {
      this.greska = 'Lozinke se ne poklapaju';
    }
    if (this.tip == 'klijent') {
      const klijent = {
        korisnickoIme: this.korisnickoIme,
        lozinka: this.lozinka,
        telefon: this.telefon,
        mejl: this.mejl,
        slika: this.slika,
        status: 'na cekanju',
        ime: this.ime,
        prezime: this.prezime,
      };

      let provera = await this.klijentServis.provera(klijent);
      if (provera != 'ok') {
        this.greska = provera;
        return;
      }

      this.klijentServis.registracija(klijent).subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          this.greska = '';
        } else {
          this.greska = odgovor['poruka'];
          return;
        }
      });

      this.korisnikServis
        .ubaciKorisnika(this.korisnickoIme, this.lozinka, this.tip)
        .subscribe((odgovor) => {
          if (odgovor['poruka'] == 'ok') {
            alert('Uspesno ste se registrovali\nAdmini ce vas uskoro odobriti');
            this.ruter.navigate(['/prijava']);
          } else {
            this.greska = odgovor['poruka'];
          }
        });
    } else if (this.tip == 'agencija') {
      const agencija = {
        korisnickoIme: this.korisnickoIme,
        lozinka: this.lozinka,
        telefon: this.telefon,
        mejl: this.mejl,
        slika: this.slika,
        status: 'na cekanju',
        naziv: this.naziv,
        ulica: this.ulica,
        grad: this.grad,
        drzava: this.drzava,
        maticniBroj: this.maticniBroj,
        opis: this.opis,
      };

      let provera = this.agencijaKlijent.provera(agencija);
      if (provera != 'ok') {
        this.greska = provera;
        return;
      }

      this.agencijaKlijent.registracija(agencija).subscribe((odgovor) => {
        if (odgovor['poruka'] == 'ok') {
          this.greska = '';
        } else {
          this.greska = odgovor['poruka'];
          return;
        }
      });

      this.korisnikServis
        .ubaciKorisnika(this.korisnickoIme, this.lozinka, this.tip)
        .subscribe((odgovor) => {
          if (odgovor['poruka'] == 'ok') {
            alert('Uspesno ste se registrovali\nAdmini ce vas uskoro odobriti');
            this.ruter.navigate(['/prijava']);
          } else {
            this.greska = odgovor['poruka'];
          }
        });
    } else {
      this.greska = 'Morate izabrati tip korisnika';
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

  tip: string = '';
  korisnickoIme: string = '';
  lozinka: string = '';
  potvrdaLozinke: string = '';
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
