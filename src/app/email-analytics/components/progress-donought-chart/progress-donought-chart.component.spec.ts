import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDonoughtChartComponent } from './progress-donought-chart.component';

describe('ProgressDonoughtChartComponent', () => {
  let component: ProgressDonoughtChartComponent;
  let fixture: ComponentFixture<ProgressDonoughtChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressDonoughtChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressDonoughtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
