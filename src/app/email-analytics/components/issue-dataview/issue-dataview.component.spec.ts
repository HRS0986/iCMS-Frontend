import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDataviewComponent } from './issue-dataview.component';

describe('IssueDataviewComponent', () => {
  let component: IssueDataviewComponent;
  let fixture: ComponentFixture<IssueDataviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueDataviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueDataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
