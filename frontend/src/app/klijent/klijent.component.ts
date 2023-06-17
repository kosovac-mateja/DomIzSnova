import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css'],
})
export class KlijentComponent implements OnInit {
  constructor(private ruter: Router) {}

  ngOnInit(): void {}

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }
}
