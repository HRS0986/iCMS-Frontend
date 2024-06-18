import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartSmComponent } from './line-chart-sm.component';

describe('LineChartSmComponent', () => {
  let component: LineChartSmComponent;
  let fixture: ComponentFixture<LineChartSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartSmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
