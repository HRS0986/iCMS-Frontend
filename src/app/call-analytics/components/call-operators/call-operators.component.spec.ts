import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallOperatorsComponent } from './call-operators.component';

describe('CallOperatorsComponent', () => {
  let component: CallOperatorsComponent;
  let fixture: ComponentFixture<CallOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallOperatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CallOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
