import { Component, OnInit } from '@angular/core';
import { MejlService } from '../services/mejl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaboravljena-lozinka',
  templateUrl: './zaboravljena-lozinka.component.html',
  styleUrls: ['./zaboravljena-lozinka.component.css'],
})
export class ZaboravljenaLozinkaComponent implements OnInit {
  constructor(private mejlServis: MejlService, private ruter: Router) {}

  ngOnInit(): void {}

  resetuj() {
    //TODO: proveriti da li mejl postoji u bazi
    if (this.mejl != this.mejlPotvrda) {
      this.greska = 'Mejl adrese se ne poklapaju!';
      return;
    }
    this.mejlServis.posaljiMejl(this.mejl).subscribe((res) => {});
    this.ruter.navigate(['/prijava']);
  }

  mejl: string;
  mejlPotvrda: string;
  greska: string = '';
}
