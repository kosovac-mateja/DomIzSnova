import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeAdminComponent } from './azuriranje-admin.component';

describe('AzuriranjeAdminComponent', () => {
  let component: AzuriranjeAdminComponent;
  let fixture: ComponentFixture<AzuriranjeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AzuriranjeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
