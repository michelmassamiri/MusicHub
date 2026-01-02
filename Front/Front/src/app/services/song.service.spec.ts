import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SongService } from './song.service';

describe('SongService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    const service: SongService = TestBed.get(SongService);
    expect(service).toBeTruthy();
  });
});
