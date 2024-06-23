import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartSampleComponent } from './line-chart-sample.component';

describe('LineChartSampleComponent', () => {
  let component: LineChartSampleComponent;
  let fixture: ComponentFixture<LineChartSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartSampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
