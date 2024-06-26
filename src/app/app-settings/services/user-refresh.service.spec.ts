import { TestBed } from '@angular/core/testing';

import { UserRefreshService } from './user-refresh.service';

describe('UserRefreshService', () => {
  let service: UserRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
