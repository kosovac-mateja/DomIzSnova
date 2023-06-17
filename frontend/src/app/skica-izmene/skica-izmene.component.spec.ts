import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkicaIzmeneComponent } from './skica-izmene.component';

describe('SkicaIzmeneComponent', () => {
  let component: SkicaIzmeneComponent;
  let fixture: ComponentFixture<SkicaIzmeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkicaIzmeneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkicaIzmeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
