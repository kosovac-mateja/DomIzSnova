import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaKreiranjeComponent } from './skica-kreiranje.component';

describe('SkicaKreiranjeComponent', () => {
  let component: SkicaKreiranjeComponent;
  let fixture: ComponentFixture<SkicaKreiranjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaKreiranjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaKreiranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
