import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInquiryCardComponent } from './dashboard-inquiry-card.component';

describe('DashboardInquiryCardComponent', () => {
  let component: DashboardInquiryCardComponent;
  let fixture: ComponentFixture<DashboardInquiryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardInquiryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardInquiryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
