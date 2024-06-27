import { TestBed } from '@angular/core/testing';

import { ProfileSettingsService } from './profile-settings.service';

describe('ProfileSettingsService', () => {
  let service: ProfileSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
