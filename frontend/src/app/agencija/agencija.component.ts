import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agencija',
  templateUrl: './agencija.component.html',
  styleUrls: ['./agencija.component.css'],
})
export class AgencijaComponent implements OnInit {
  constructor(private ruter: Router) {}

  ngOnInit(): void {}

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }
}
