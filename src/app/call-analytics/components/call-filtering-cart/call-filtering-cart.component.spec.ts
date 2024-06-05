import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallFilteringCartComponent } from './call-filtering-cart.component';

describe('CallFilteringCartComponent', () => {
  let component: CallFilteringCartComponent;
  let fixture: ComponentFixture<CallFilteringCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallFilteringCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallFilteringCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
