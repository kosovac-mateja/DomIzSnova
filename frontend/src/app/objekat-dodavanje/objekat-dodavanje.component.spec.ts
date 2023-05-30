import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekatDodavanjeComponent } from './objekat-dodavanje.component';

describe('ObjekatDodavanjeComponent', () => {
  let component: ObjekatDodavanjeComponent;
  let fixture: ComponentFixture<ObjekatDodavanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjekatDodavanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjekatDodavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
