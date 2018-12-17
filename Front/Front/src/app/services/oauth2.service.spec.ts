import { TestBed } from '@angular/core/testing';

import { Oauth2Service } from './oauth2.service';

describe('Oauth2Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Oauth2Service = TestBed.get(Oauth2Service);
    expect(service).toBeTruthy();
  });
});
