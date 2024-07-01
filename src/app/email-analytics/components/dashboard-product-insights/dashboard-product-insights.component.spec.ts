import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardProductInsightsComponent } from './dashboard-product-insights.component';

describe('DashboardProductInsightsComponent', () => {
  let component: DashboardProductInsightsComponent;
  let fixture: ComponentFixture<DashboardProductInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardProductInsightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardProductInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
