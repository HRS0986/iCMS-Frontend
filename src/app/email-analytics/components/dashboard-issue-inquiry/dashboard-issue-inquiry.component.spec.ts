import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIssueInquiryComponent } from './dashboard-issue-inquiry.component';

describe('DashboardIssueInquiryComponent', () => {
  let component: DashboardIssueInquiryComponent;
  let fixture: ComponentFixture<DashboardIssueInquiryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardIssueInquiryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardIssueInquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
