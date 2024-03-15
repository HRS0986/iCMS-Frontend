import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFilteringComponent } from './email-filtering.component';

describe('EmailFilteringComponent', () => {
  let component: EmailFilteringComponent;
  let fixture: ComponentFixture<EmailFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
