import { TestBed } from '@angular/core/testing';

import { MejlService } from './mejl.service';

describe('MejlService', () => {
  let service: MejlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MejlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
