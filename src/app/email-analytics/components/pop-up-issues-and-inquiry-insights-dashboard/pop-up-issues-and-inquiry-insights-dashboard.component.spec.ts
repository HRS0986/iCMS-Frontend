import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpIssuesAndInquiryInsightsDashboardComponent } from './pop-up-issues-and-inquiry-insights-dashboard.component';

describe('PopUpIssuesAndInquiryInsightsDashboardComponent', () => {
  let component: PopUpIssuesAndInquiryInsightsDashboardComponent;
  let fixture: ComponentFixture<PopUpIssuesAndInquiryInsightsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpIssuesAndInquiryInsightsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpIssuesAndInquiryInsightsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
