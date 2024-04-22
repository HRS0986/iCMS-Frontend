import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiSendingEmailAccCardComponent } from './noti-sending-email-acc-card.component';

describe('NotiSendingEmailAccCardComponent', () => {
  let component: NotiSendingEmailAccCardComponent;
  let fixture: ComponentFixture<NotiSendingEmailAccCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotiSendingEmailAccCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotiSendingEmailAccCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
