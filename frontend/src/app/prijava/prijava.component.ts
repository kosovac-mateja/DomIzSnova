import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
})
export class PrijavaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prijava() {
    //TODO: implementirati
  }

  korisnickoIme: string;
  lozinka: string;

  greska: string = '';
}
