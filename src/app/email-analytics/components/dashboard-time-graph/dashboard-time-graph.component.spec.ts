import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTimeGraphComponent } from './dashboard-time-graph.component';

describe('DashboardTimeGraphComponent', () => {
  let component: DashboardTimeGraphComponent;
  let fixture: ComponentFixture<DashboardTimeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTimeGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
