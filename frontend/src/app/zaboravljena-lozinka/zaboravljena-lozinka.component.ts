import { Component, OnInit } from '@angular/core';
import { MejlService } from '../services/mejl.service';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { KlijentService } from '../services/klijent.service';
import { Klijent } from '../models/klijent';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css'],
})
export class ZaboravljenaLozinkaComponent implements OnInit {
  constructor(
    private mejlServis: MejlService,
    private ruter: Router,
    private agencijaServis: AgencijaService,
    private klijentServis: KlijentService
  ) {}

  ngOnInit(): void {}

  async resetuj() {
    if (this.mejl != this.mejlPotvrda) {
      this.greska = 'Mejl adrese se ne poklapaju!';
      return;
    }

    let korisnickoIme: string = '';

    let postojiKlijent: boolean = await this.klijentServis.mejlPostoji(
      this.mejl
    );
    let postojiAgencija: boolean = await this.agencijaServis.mejlPostoji(
      this.mejl
    );

    if (postojiKlijent) {
      let klijent: Klijent = await this.klijentServis.dohvatiKlijentaPoMejlu(
        this.mejl
      );
      korisnickoIme = klijent.korisnickoIme;
    } else if (postojiAgencija) {
      let agencija: Agencija = await this.agencijaServis.dohvatiAgencijuPoMejlu(
        this.mejl
      );
      korisnickoIme = agencija.korisnickoIme;
    } else {
      this.greska = 'Mejl adresa ne postoji!';
      return;
    }

    this.mejlServis.posaljiMejl(this.mejl).subscribe((res) => {
      let lozinka: string = res['lozinka'];
      this.mejlServis
        .ubaciPrivremenuLozinku(korisnickoIme, lozinka)
        .subscribe((res) => {
          if (res['poruka'] == 'ok') {
            alert('Poslat je mejl sa privremenom lozinkom!');
          } else {
            alert('Greska prilikom slanja mejla!');
          }
        });
      this.ruter.navigate(['/prijava']);
    });
  }

  mejl: string;
  mejlPotvrda: string;
  greska: string = '';
}
