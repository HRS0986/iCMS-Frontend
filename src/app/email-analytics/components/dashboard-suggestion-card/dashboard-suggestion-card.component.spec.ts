import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSuggestionCardComponent } from './dashboard-suggestion-card.component';

describe('DashboardSuggestionCardComponent', () => {
  let component: DashboardSuggestionCardComponent;
  let fixture: ComponentFixture<DashboardSuggestionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSuggestionCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSuggestionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
