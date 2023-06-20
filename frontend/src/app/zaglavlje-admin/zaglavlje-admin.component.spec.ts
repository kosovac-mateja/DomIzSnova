import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaglavljeAdminComponent } from './zaglavlje-admin.component';

describe('ZaglavljeAdminComponent', () => {
  let component: ZaglavljeAdminComponent;
  let fixture: ComponentFixture<ZaglavljeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaglavljeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZaglavljeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
