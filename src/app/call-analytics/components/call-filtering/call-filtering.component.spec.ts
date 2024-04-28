import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFilteringComponent } from './call-filtering.component';

describe('CallFilteringComponent', () => {
  let component: CallFilteringComponent;
  let fixture: ComponentFixture<CallFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
