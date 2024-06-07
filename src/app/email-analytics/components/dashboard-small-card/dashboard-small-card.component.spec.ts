import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSmallCardComponent } from './dashboard-small-card.component';

describe('DashboardSmallCardComponent', () => {
  let component: DashboardSmallCardComponent;
  let fixture: ComponentFixture<DashboardSmallCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardSmallCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardSmallCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
