import { TestBed } from '@angular/core/testing';

import { BlokiranjeService } from './blokiranje.service';

describe('BlokiranjeService', () => {
  let service: BlokiranjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlokiranjeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
