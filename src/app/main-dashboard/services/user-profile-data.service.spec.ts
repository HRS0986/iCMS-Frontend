import { TestBed } from '@angular/core/testing';

import { UserProfileDataService } from './user-profile-data.service';

describe('UserProfileDataService', () => {
  let service: UserProfileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
