import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardIssueCardComponent } from './dashboard-issue-card.component';

describe('DashboardIssueCardComponent', () => {
  let component: DashboardIssueCardComponent;
  let fixture: ComponentFixture<DashboardIssueCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardIssueCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardIssueCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
