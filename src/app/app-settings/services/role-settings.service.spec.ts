import { TestBed } from '@angular/core/testing';

import { RoleSettingsService } from './role-settings.service';

describe('RoleSettingsService', () => {
  let service: RoleSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
