import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQueryComponent } from './filter-query.component';

describe('FilterQueryComponent', () => {
  let component: FilterQueryComponent;
  let fixture: ComponentFixture<FilterQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterQueryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
