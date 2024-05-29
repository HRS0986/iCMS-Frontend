import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicHorizontalBarchartComponent } from './dynamic-horizontal-barchart.component';

describe('DynamicHorizontalBarchartComponent', () => {
  let component: DynamicHorizontalBarchartComponent;
  let fixture: ComponentFixture<DynamicHorizontalBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicHorizontalBarchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicHorizontalBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
