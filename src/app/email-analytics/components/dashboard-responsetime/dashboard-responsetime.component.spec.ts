import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardResponsetimeComponent } from './dashboard-responsetime.component';

describe('DashboardResponsetimeComponent', () => {
  let component: DashboardResponsetimeComponent;
  let fixture: ComponentFixture<DashboardResponsetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardResponsetimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardResponsetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
