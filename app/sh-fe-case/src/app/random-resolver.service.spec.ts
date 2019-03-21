import { TestBed } from '@angular/core/testing';

import { RandomResolverService } from './random-resolver.service';

describe('RandomResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RandomResolverService = TestBed.get(RandomResolverService);
    expect(service).toBeTruthy();
  });
});
