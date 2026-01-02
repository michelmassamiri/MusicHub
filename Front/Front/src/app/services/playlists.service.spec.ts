import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { PlaylistsService } from './playlists.service';

describe('PlaylistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    const service: PlaylistsService = TestBed.get(PlaylistsService);
    expect(service).toBeTruthy();
  });
});
