import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOverallProgressComponent } from './dashboard-overall-progress.component';

describe('DashboardOverallProgressComponent', () => {
  let component: DashboardOverallProgressComponent;
  let fixture: ComponentFixture<DashboardOverallProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOverallProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardOverallProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
