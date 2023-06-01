import { TestBed } from '@angular/core/testing';

import { SkicaService } from './skica.service';

describe('SkicaService', () => {
  let service: SkicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
