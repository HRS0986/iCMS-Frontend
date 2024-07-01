import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpProductInsightsDashboardComponent } from './pop-up-product-insights-dashboard.component';

describe('PopUpProductInsightsDashboardComponent', () => {
  let component: PopUpProductInsightsDashboardComponent;
  let fixture: ComponentFixture<PopUpProductInsightsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopUpProductInsightsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpProductInsightsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
