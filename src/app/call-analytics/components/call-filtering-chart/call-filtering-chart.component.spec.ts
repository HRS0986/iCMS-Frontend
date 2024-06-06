import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFilteringChartComponent } from './call-filtering-chart.component';

describe('CallFilteringChartComponent', () => {
  let component: CallFilteringChartComponent;
  let fixture: ComponentFixture<CallFilteringChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallFilteringChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallFilteringChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
