import { TestBed } from '@angular/core/testing';

import { AddRoleService } from './add-role.service';

describe('AddRoleService', () => {
  let service: AddRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
