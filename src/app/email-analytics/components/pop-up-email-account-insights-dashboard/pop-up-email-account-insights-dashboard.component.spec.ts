import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpEmailAccountInsightsDashboardComponent } from './pop-up-email-account-insights-dashboard.component';

describe('PopUpEmailAccountInsightsDashboardComponent', () => {
  let component: PopUpEmailAccountInsightsDashboardComponent;
  let fixture: ComponentFixture<PopUpEmailAccountInsightsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpEmailAccountInsightsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpEmailAccountInsightsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
