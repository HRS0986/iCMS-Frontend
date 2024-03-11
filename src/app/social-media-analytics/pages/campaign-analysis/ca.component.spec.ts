import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CAComponent } from './ca.component';

describe('CAComponent', () => {
  let component: CAComponent;
  let fixture: ComponentFixture<CAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CAComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
