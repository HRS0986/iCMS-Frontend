import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAccountInsightsComponent } from './dashboard-account-insights.component';

describe('DashboardAccountInsightsComponent', () => {
  let component: DashboardAccountInsightsComponent;
  let fixture: ComponentFixture<DashboardAccountInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardAccountInsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardAccountInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
