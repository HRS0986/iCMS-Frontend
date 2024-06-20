import { TestBed } from '@angular/core/testing';

import { InquiryService } from './inquiry.service';

describe('InquiryService', () => {
  let service: InquiryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InquiryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
