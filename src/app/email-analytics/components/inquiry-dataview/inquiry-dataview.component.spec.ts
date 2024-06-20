import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDataviewComponent } from './inquiry-dataview.component';

describe('InquiryDataviewComponent', () => {
  let component: InquiryDataviewComponent;
  let fixture: ComponentFixture<InquiryDataviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InquiryDataviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InquiryDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
