import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosloviAdminComponent } from './poslovi-admin.component';

describe('PosloviAdminComponent', () => {
  let component: PosloviAdminComponent;
  let fixture: ComponentFixture<PosloviAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosloviAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosloviAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
