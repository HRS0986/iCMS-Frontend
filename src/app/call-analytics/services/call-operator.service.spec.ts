import { TestBed } from '@angular/core/testing';

import { CallOperatorService } from './call-operator.service';

describe('CallOperatorService', () => {
  let service: CallOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
