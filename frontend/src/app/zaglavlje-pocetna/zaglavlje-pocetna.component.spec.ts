import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaglavljePocetnaComponent } from './zaglavlje-pocetna.component';

describe('ZaglavljePocetnaComponent', () => {
  let component: ZaglavljePocetnaComponent;
  let fixture: ComponentFixture<ZaglavljePocetnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaglavljePocetnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaglavljePocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
