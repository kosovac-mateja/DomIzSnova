import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadniciAdminComponent } from './radnici-admin.component';

describe('RadniciAdminComponent', () => {
  let component: RadniciAdminComponent;
  let fixture: ComponentFixture<RadniciAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadniciAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadniciAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
