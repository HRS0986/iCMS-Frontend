import { TestBed } from '@angular/core/testing';

import { ThreadService } from './thread.service';

describe('ThreadService', () => {
  let service: ThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
