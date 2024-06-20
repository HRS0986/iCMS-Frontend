import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterQuerySuggestionsComponent } from './filter-query-suggestions.component';

describe('FilterQuerySuggestionsComponent', () => {
  let component: FilterQuerySuggestionsComponent;
  let fixture: ComponentFixture<FilterQuerySuggestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterQuerySuggestionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterQuerySuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
