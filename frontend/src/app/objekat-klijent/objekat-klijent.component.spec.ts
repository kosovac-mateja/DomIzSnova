import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjekatKlijentComponent } from './objekat-klijent.component';

describe('ObjekatKlijentComponent', () => {
  let component: ObjekatKlijentComponent;
  let fixture: ComponentFixture<ObjekatKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjekatKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjekatKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
