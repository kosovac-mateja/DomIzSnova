import { Component, OnInit } from '@angular/core';
import { ProveraService } from '../services/provera.service';
import { KorisnikService } from '../services/korisnik.service';
import { KlijentService } from '../services/klijent.service';
import { AgencijaService } from '../services/agencija.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija-admin',
  templateUrl: './registracija-admin.component.html',
  styleUrls: ['./registracija-admin.component.css', '../../styles.css'],
})
export class RegistracijaAdminComponent implements OnInit {
  constructor(
    private proveraServis: ProveraService,
    private korisnikServis: KorisnikService,
    private klijentServis: KlijentService,
    private agencijaServis: AgencijaService,
    private ruter: Router
  ) {}

  ngOnInit(): void {}

  async registracija() {
    if (this.lozinka != this.potvrdaLozinke) {
      this.greska = 'Lozinke se ne poklapaju';
      return;
    }

    if (this.slikaIzabrana == false) {
      return;
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

      let provera = await this.proveraServis.proveraKlijent(klijent);
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
            alert('Uspesno ste dodali novog klijenta');
            this.ruter.navigate(['/admin.korisnici']);
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

      let provera = await this.proveraServis.proveraAgencija(agencija);
      if (provera != 'ok') {
        this.greska = provera;
        return;
      }

      this.agencijaServis.registracija(agencija).subscribe((odgovor) => {
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
            alert('Uspesno ste dodali novu agenciju');
            this.ruter.navigate(['/admin.korisnici']);
          } else {
            this.greska = odgovor['poruka'];
          }
        });
    } else {
      this.greska = 'Morate izabrati tip korisnika';
    }
  }

  otpremanjeSlike(fajl) {
    if (fajl.target.files[0]) {
      if (
        fajl.target.files[0].type == 'image/jpeg' ||
        fajl.target.files[0].type == 'image/png'
      ) {
        const citac = new FileReader();
        citac.onload = (e: any) => {
          const slika = new Image();
          slika.src = e.target.result;
          slika.onload = (res) => {
            const visina = res.currentTarget['height'];
            const sirina = res.currentTarget['width'];

            if (visina == sirina) {
              if (visina > 300 || visina < 100) {
                this.greska =
                  'Slika mora biti dimenzija izmedju 100x100px i 300x300px';
                this.slikaIzabrana = false;
              } else {
                this.greska = '';
                this.slika = e.target.result;
                this.slikaIzabrana = true;
              }
            } else {
              this.greska = 'Slika mora biti kvadratnog oblika';
              this.slikaIzabrana = false;
            }
          };
        };
        citac.readAsDataURL(fajl.target.files[0]);
      } else {
        this.greska = 'Slika mora biti u PNG/JPG formatu';
        this.slikaIzabrana = false;
      }
    }
  }

  tip: string = 'klijent';
  korisnickoIme: string = '';
  lozinka: string = '';
  potvrdaLozinke: string = '';
  telefon: string = '';
  mejl: string = '';
  slika: string = '';
  fajl: File = null;

  ime: string = '';
  prezime: string = '';

  naziv: string = '';
  ulica: string = '';
  grad: string = '';
  drzava: string = '';
  maticniBroj: string = '';
  opis: string = '';

  greska: string = '';
  slikaIzabrana: boolean = true;
}
