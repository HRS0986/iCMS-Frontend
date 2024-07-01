import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorCardItemComponent } from './operator-card-item.component';

describe('OperatorCardItemComponent', () => {
  let component: OperatorCardItemComponent;
  let fixture: ComponentFixture<OperatorCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperatorCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
