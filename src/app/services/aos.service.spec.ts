import { TestBed } from '@angular/core/testing';

import { AosService } from './aos.service';

describe('AosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AosService = TestBed.get(AosService);
    expect(service).toBeTruthy();
  });
});
