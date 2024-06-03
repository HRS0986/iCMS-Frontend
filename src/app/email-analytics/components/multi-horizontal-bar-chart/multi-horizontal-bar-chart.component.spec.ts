import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiHorizontalBarChartComponent } from './multi-horizontal-bar-chart.component';

describe('MultiHorizontalBarChartComponent', () => {
  let component: MultiHorizontalBarChartComponent;
  let fixture: ComponentFixture<MultiHorizontalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiHorizontalBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiHorizontalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
