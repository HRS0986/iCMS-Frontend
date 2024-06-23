import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffiEffecDonoughtChartComponent } from './effi-effec-donought-chart.component';

describe('EffiEffecDonoughtChartComponent', () => {
  let component: EffiEffecDonoughtChartComponent;
  let fixture: ComponentFixture<EffiEffecDonoughtChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EffiEffecDonoughtChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EffiEffecDonoughtChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
