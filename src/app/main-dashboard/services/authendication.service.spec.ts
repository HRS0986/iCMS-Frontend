import { TestBed } from '@angular/core/testing';

import { AuthendicationService } from './authendication.service';

describe('AuthendicationService', () => {
  let service: AuthendicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthendicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
