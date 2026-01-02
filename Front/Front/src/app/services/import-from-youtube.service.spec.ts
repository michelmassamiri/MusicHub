import { TestBed } from '@angular/core/testing';
import { ImportFromYoutubeService } from './import-from-youtube.service';

// Define gapi before any service is loaded
(window as any).gapi = (window as any).gapi || {
  load: (str: string, callback: Function) => { callback(); },
  auth2: {
    init: (options?: any) => ({ then: (callback: Function) => { callback(); return Promise.resolve(); } })
  },
  client: {
    init: (options?: any) => Promise.resolve()
  }
};

describe('ImportFromYoutubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportFromYoutubeService = TestBed.get(ImportFromYoutubeService);
    expect(service).toBeTruthy();
  });
});
