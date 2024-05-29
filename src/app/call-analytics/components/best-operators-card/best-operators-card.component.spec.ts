import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestOperatorsCardComponent } from './best-operators-card.component';

describe('BestOperatorsCardComponent', () => {
  let component: BestOperatorsCardComponent;
  let fixture: ComponentFixture<BestOperatorsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestOperatorsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestOperatorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
