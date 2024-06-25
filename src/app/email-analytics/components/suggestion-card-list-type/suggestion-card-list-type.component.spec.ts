import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionCardListTypeComponent } from './suggestion-card-list-type.component';

describe('SuggestionCardListTypeComponent', () => {
  let component: SuggestionCardListTypeComponent;
  let fixture: ComponentFixture<SuggestionCardListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestionCardListTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestionCardListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
