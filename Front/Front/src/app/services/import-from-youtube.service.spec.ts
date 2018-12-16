import { TestBed } from '@angular/core/testing';

import { ImportFromYoutubeService } from './import-from-youtube.service';

describe('ImportFromYoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportFromYoutubeService = TestBed.get(ImportFromYoutubeService);
    expect(service).toBeTruthy();
  });
});
