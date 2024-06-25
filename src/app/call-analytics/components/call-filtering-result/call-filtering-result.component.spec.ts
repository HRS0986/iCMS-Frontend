import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFilteringResultComponent } from './call-filtering-result.component';

describe('CallFilteringResultComponent', () => {
  let component: CallFilteringResultComponent;
  let fixture: ComponentFixture<CallFilteringResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallFilteringResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallFilteringResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
