import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCardListTypeComponent } from './thread-card-list-type.component';

describe('ThreadCardListTypeComponent', () => {
  let component: ThreadCardListTypeComponent;
  let fixture: ComponentFixture<ThreadCardListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreadCardListTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreadCardListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
