import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaglavljeAgencijaComponent } from './zaglavlje-agencija.component';

describe('ZaglavljeAgencijaComponent', () => {
  let component: ZaglavljeAgencijaComponent;
  let fixture: ComponentFixture<ZaglavljeAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaglavljeAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaglavljeAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
