import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilAgencijaComponent } from './profil-agencija.component';

describe('ProfilAgencijaComponent', () => {
  let component: ProfilAgencijaComponent;
  let fixture: ComponentFixture<ProfilAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
