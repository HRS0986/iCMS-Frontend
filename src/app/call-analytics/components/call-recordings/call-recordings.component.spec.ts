import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallRecordingsComponent } from './call-recordings.component';

describe('CallRecordingsComponent', () => {
  let component: CallRecordingsComponent;
  let fixture: ComponentFixture<CallRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallRecordingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
