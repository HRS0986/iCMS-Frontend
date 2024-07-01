import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceInsightsDashboardComponent } from './performance-insights-dashboard.component';

describe('PerformanceInsightsDashboardComponent', () => {
  let component: PerformanceInsightsDashboardComponent;
  let fixture: ComponentFixture<PerformanceInsightsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceInsightsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceInsightsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
