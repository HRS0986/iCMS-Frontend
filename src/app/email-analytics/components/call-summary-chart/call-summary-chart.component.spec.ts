import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSummaryChartComponent } from './call-summary-chart.component';

describe('CallSummaryChartComponent', () => {
  let component: CallSummaryChartComponent;
  let fixture: ComponentFixture<CallSummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallSummaryChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallSummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
