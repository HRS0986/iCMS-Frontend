import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationMessageComponent } from './authorization-message.component';

describe('AuthorizationMessageComponent', () => {
  let component: AuthorizationMessageComponent;
  let fixture: ComponentFixture<AuthorizationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthorizationMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorizationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
