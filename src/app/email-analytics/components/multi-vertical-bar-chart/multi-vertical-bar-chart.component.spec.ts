import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiVerticalBarChartComponent } from './multi-vertical-bar-chart.component';

describe('MultiVerticalBarChartComponent', () => {
  let component: MultiVerticalBarChartComponent;
  let fixture: ComponentFixture<MultiVerticalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiVerticalBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiVerticalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
