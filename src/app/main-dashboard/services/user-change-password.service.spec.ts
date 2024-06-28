import { TestBed } from '@angular/core/testing';

import { UserChangePasswordService } from './user-change-password.service';

describe('UserChangePasswordService', () => {
  let service: UserChangePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChangePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
