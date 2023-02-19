import { TestBed } from '@angular/core/testing';

import { AmbetsService } from './ambets.service';

describe('AmbetsService', () => {
  let service: AmbetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
