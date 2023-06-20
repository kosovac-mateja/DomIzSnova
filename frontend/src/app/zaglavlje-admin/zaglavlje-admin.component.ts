import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-zaglavlje-admin',
  templateUrl: './zaglavlje-admin.component.html',
  styleUrls: ['./zaglavlje-admin.component.css'],
})
export class ZaglavljeAdminComponent implements OnInit {
  constructor(private ruter: Router) {}

  ngOnInit(): void {}

  odjava() {
    sessionStorage.clear();
    this.ruter.navigate(['/']);
  }
}
