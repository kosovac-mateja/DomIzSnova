import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css'],
})
export class PrijavaAdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  prijava() {
    //TODO: implementirati
  }

  korisnickoIme: string;
  lozinka: string;

  greska: string = '';
}
