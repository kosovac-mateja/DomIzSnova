import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistracijaAdminComponent } from './registracija-admin.component';

describe('RegistracijaAdminComponent', () => {
  let component: RegistracijaAdminComponent;
  let fixture: ComponentFixture<RegistracijaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistracijaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistracijaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
