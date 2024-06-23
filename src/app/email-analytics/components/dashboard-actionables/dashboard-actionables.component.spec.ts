import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActionablesComponent } from './dashboard-actionables.component';

describe('DashboardActionablesComponent', () => {
  let component: DashboardActionablesComponent;
  let fixture: ComponentFixture<DashboardActionablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardActionablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardActionablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
