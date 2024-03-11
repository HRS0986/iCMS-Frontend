import { TestBed } from '@angular/core/testing';

import { CallAnalyticsService } from './call-analytics.service';

describe('CallAnalyticsService', () => {
  let service: CallAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
