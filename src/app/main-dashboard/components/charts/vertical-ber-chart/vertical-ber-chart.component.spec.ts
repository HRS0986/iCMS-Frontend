import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalBerChartComponent } from './vertical-ber-chart.component';

describe('VerticalBerChartComponent', () => {
  let component: VerticalBerChartComponent;
  let fixture: ComponentFixture<VerticalBerChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerticalBerChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerticalBerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
