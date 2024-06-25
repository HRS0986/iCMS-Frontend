import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDataviewComponent } from './thread-dataview.component';

describe('ThreadDataviewComponent', () => {
  let component: ThreadDataviewComponent;
  let fixture: ComponentFixture<ThreadDataviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreadDataviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ThreadDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
