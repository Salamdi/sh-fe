import { TestBed } from '@angular/core/testing';

import { FavoritesResolverService } from './favorites-resolver.service';

describe('FavoritesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavoritesResolverService = TestBed.get(FavoritesResolverService);
    expect(service).toBeTruthy();
  });
});
