import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

// Define gapi before any component is loaded
(window as any).gapi = (window as any).gapi || {
  load: (str: string, callback: Function) => { callback(); },
  auth2: {
    init: (options?: any) => ({ then: (callback: Function) => { callback(); return Promise.resolve(); } })
  },
  client: {
    init: (options?: any) => Promise.resolve()
  }
};

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
