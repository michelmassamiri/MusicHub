import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SongsResolversService } from './songs-resolvers.service';

describe('SongsResolversService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting()
    ]
  }));

  it('should be created', () => {
    const service: SongsResolversService = TestBed.get(SongsResolversService);
    expect(service).toBeTruthy();
  });
});
