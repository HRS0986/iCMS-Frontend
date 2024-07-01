import { TestBed } from '@angular/core/testing';

import { UserUpdateService } from './user-update.service';

describe('UserUpdateService', () => {
  let service: UserUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
