import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringFeaturesComponent } from './filtering-features.component';

describe('FilteringFeaturesComponent', () => {
  let component: FilteringFeaturesComponent;
  let fixture: ComponentFixture<FilteringFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilteringFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteringFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
