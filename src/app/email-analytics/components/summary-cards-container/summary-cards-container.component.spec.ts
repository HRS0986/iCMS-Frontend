import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryCardsContainerComponent } from './summary-cards-container.component';

describe('SummaryCardsContainerComponent', () => {
  let component: SummaryCardsContainerComponent;
  let fixture: ComponentFixture<SummaryCardsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SummaryCardsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SummaryCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
