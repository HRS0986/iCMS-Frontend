import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAccCardComponent } from './email-acc-card.component';

describe('EmailAccCardComponent', () => {
  let component: EmailAccCardComponent;
  let fixture: ComponentFixture<EmailAccCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailAccCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailAccCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
