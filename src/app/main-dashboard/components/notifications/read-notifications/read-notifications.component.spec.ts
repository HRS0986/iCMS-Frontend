import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNotificationsComponent } from './read-notifications.component';

describe('ReadNotificationsComponent', () => {
  let component: ReadNotificationsComponent;
  let fixture: ComponentFixture<ReadNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
