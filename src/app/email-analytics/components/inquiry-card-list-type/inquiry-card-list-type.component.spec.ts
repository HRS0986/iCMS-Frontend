import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryCardListTypeComponent } from './inquiry-card-list-type.component';

describe('InquiryCardListTypeComponent', () => {
  let component: InquiryCardListTypeComponent;
  let fixture: ComponentFixture<InquiryCardListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InquiryCardListTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryCardListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
