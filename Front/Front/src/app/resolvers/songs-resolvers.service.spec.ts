import { TestBed } from '@angular/core/testing';

import { SongsResolversService } from './songs-resolvers.service';

describe('SongsResolversService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongsResolversService = TestBed.get(SongsResolversService);
    expect(service).toBeTruthy();
  });
});
