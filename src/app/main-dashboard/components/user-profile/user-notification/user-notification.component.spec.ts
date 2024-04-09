import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationComponent } from './user-notification.component';

describe('UserNotificationComponent', () => {
  let component: UserNotificationComponent;
  let fixture: ComponentFixture<UserNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
