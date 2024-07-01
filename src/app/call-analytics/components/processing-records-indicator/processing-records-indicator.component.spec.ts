import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingRecordsIndicatorComponent } from './processing-records-indicator.component';

describe('ProcessingRecordsIndicatorComponent', () => {
  let component: ProcessingRecordsIndicatorComponent;
  let fixture: ComponentFixture<ProcessingRecordsIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessingRecordsIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessingRecordsIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
