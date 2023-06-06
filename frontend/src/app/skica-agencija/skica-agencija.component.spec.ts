import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaAgencijaComponent } from './skica-agencija.component';

describe('SkicaAgencijaComponent', () => {
  let component: SkicaAgencijaComponent;
  let fixture: ComponentFixture<SkicaAgencijaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaAgencijaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaAgencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
