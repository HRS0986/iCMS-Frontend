import { TestBed } from '@angular/core/testing';

import { NotificationCountService } from './notification-count.service';

describe('NotificationCountService', () => {
  let service: NotificationCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
