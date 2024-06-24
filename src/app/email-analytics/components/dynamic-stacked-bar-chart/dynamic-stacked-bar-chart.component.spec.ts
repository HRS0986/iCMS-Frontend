import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStackedBarChartComponent } from './dynamic-stacked-bar-chart.component';

describe('DynamicStackedBarChartComponent', () => {
  let component: DynamicStackedBarChartComponent;
  let fixture: ComponentFixture<DynamicStackedBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicStackedBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicStackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
