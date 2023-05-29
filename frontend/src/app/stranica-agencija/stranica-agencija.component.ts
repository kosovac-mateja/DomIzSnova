import { Component, OnInit } from '@angular/core';
import { Agencija } from '../models/agencija';
import { AgencijaService } from '../services/agencija.service';

@Component({
  selector: 'app-stranica-agencija',
  templateUrl: './stranica-agencija.component.html',
  styleUrls: ['./stranica-agencija.component.css'],
})
export class StranicaAgencijaComponent implements OnInit {
  constructor(private agencijaServis: AgencijaService) {}

  ngOnInit(): void {
    let korisnickoIme = sessionStorage.getItem('agencijaIzbor');
    this.agencijaServis
      .dohvatiAgenciju(korisnickoIme)
      .subscribe((agencija: Agencija) => {
        this.agencija = agencija;
      });
  }

  agencija: Agencija;
}
