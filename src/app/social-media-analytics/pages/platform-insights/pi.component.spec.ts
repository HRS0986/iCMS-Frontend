import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PIComponent } from './pi.component';

describe('PIComponent', () => {
  let component: PIComponent;
  let fixture: ComponentFixture<PIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PIComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
