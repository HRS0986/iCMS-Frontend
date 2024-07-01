import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestWorstCardComponent } from './best-worst-card.component';

describe('BestWorstCardComponent', () => {
  let component: BestWorstCardComponent;
  let fixture: ComponentFixture<BestWorstCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BestWorstCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BestWorstCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
