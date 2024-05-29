import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardMgrAnalyticsComponent } from './stat-card-mgr-analytics.component';

describe('StatCardMgrAnalyticsComponent', () => {
  let component: StatCardMgrAnalyticsComponent;
  let fixture: ComponentFixture<StatCardMgrAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatCardMgrAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatCardMgrAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
