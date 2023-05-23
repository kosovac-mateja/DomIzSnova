import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgencijaService } from '../services/agencija.service';
import { Agencija } from '../models/agencija';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css'],
})
export class PocetnaComponent implements OnInit {
  constructor(
    private agencijaServis: AgencijaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.agencijaServis.dohvatiAgencije().subscribe((agencije: Agencija[]) => {
      this.agencije = agencije;
    });
  }

  prijava() {
    this.router.navigate(['/prijava']);
  }

  registracija() {
    this.router.navigate(['/registracija']);
  }

  agencije: Agencija[] = [];
}
