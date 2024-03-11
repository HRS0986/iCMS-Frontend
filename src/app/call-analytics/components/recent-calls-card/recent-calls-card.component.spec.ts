import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentCallsCardComponent } from './recent-calls-card.component';

describe('RecentCallsCardComponent', () => {
  let component: RecentCallsCardComponent;
  let fixture: ComponentFixture<RecentCallsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentCallsCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecentCallsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
