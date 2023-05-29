import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StranicaAgencijaComponent } from './stranica-agencija.component';

describe('StranicaAgencijaComponent', () => {
  let component: StranicaAgencijaComponent;
  let fixture: ComponentFixture<StranicaAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StranicaAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StranicaAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
