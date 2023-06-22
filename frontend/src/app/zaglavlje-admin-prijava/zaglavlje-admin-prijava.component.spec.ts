import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaglavljeAdminPrijavaComponent } from './zaglavlje-admin-prijava.component';

describe('ZaglavljeAdminPrijavaComponent', () => {
  let component: ZaglavljeAdminPrijavaComponent;
  let fixture: ComponentFixture<ZaglavljeAdminPrijavaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaglavljeAdminPrijavaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaglavljeAdminPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
