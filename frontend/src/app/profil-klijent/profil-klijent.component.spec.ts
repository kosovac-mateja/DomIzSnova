import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilKlijentComponent } from './profil-klijent.component';

describe('ProfilKlijentComponent', () => {
  let component: ProfilKlijentComponent;
  let fixture: ComponentFixture<ProfilKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
