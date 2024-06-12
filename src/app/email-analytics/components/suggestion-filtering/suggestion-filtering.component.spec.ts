import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionFilteringComponent } from './suggestion-filtering.component';

describe('SuggestionFilteringComponent', () => {
  let component: SuggestionFilteringComponent;
  let fixture: ComponentFixture<SuggestionFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
