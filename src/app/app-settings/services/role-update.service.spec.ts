import { TestBed } from '@angular/core/testing';

import { RoleUpdateService } from './role-update.service';

describe('RoleUpdateService', () => {
  let service: RoleUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
