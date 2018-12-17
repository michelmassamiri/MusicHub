import { TestBed } from '@angular/core/testing';

import { PlaylistsResolverService } from './playlists-resolver.service';

describe('PlaylistsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistsResolverService = TestBed.get(PlaylistsResolverService);
    expect(service).toBeTruthy();
  });
});
