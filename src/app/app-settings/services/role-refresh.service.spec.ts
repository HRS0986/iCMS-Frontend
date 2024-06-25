import { TestBed } from '@angular/core/testing';

import { RoleRefreshService } from './role-refresh.service';

describe('RoleRefreshService', () => {
  let service: RoleRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleRefreshService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
