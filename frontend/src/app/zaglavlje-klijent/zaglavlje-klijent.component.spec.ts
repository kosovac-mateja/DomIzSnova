import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaglavljeKlijentComponent } from './zaglavlje-klijent.component';

describe('ZaglavljeKlijentComponent', () => {
  let component: ZaglavljeKlijentComponent;
  let fixture: ComponentFixture<ZaglavljeKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaglavljeKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaglavljeKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
