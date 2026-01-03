import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PlaylistsResolverService } from './playlists-resolver.service';

describe('PlaylistsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    const service: PlaylistsResolverService = TestBed.get(PlaylistsResolverService);
    expect(service).toBeTruthy();
  });
});
