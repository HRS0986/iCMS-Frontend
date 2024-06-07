import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSentimentCardComponent } from './dashboard-sentiment-card.component';

describe('DashboardSentimentCardComponent', () => {
  let component: DashboardSentimentCardComponent;
  let fixture: ComponentFixture<DashboardSentimentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSentimentCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSentimentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
