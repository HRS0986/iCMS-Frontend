import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalBarChartComponent } from './horizontal-bar-chart.component';

describe('HorizontalBarChartComponent', () => {
  let component: HorizontalBarChartComponent;
  let fixture: ComponentFixture<HorizontalBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorizontalBarChartComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HorizontalBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
