import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringComponent } from './filtering.component';

describe('FilteringComponent', () => {
  let component: FilteringComponent;
  let fixture: ComponentFixture<FilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filter criteria when applyFilters is called', () => {
    spyOn(component.filterEmitter, 'emit');
    component.applyFilters();
    expect(component.filterEmitter.emit).toHaveBeenCalledWith(component.filterCriteria);
  });

  it('should clear filter criteria when clearFilters is called', () => {
    component.clearFilters();
    expect(component.filterCriteria).toEqual(component.emptyFilterCriteria);
  });

  it('should clear filter criteria and emit filter criteria when cancelFilters is called', () => {
    spyOn(component.filterEmitter, 'emit');
    component.cancelFilters();
    expect(component.filterCriteria).toEqual(component.emptyFilterCriteria);
    expect(component.filterEmitter.emit).toHaveBeenCalledWith(component.filterCriteria);
  });
});