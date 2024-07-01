import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSummaryCardComponent } from './dashboard-summary-card.component';

describe('DashboardSummaryCardComponent', () => {
  let component: DashboardSummaryCardComponent;
  let fixture: ComponentFixture<DashboardSummaryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSummaryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSummaryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
