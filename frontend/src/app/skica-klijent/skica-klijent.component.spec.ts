import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaKlijentComponent } from './skica-klijent.component';

describe('SkicaKlijentComponent', () => {
  let component: SkicaKlijentComponent;
  let fixture: ComponentFixture<SkicaKlijentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaKlijentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaKlijentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
