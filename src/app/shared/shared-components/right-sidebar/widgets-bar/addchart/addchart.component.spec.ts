import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddchartComponent } from './addchart.component';

describe('AddchartComponent', () => {
  let component: AddchartComponent;
  let fixture: ComponentFixture<AddchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddchartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
