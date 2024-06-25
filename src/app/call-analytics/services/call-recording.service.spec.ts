import { TestBed } from '@angular/core/testing';
import { CallRecordingService } from './call-recording.service';

describe('CallRecordingService', () => {
  let service: CallRecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallRecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
