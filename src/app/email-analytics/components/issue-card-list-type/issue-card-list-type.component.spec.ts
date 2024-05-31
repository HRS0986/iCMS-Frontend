import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCardListTypeComponent } from './issue-card-list-type.component';

describe('IssueCardListTypeComponent', () => {
  let component: IssueCardListTypeComponent;
  let fixture: ComponentFixture<IssueCardListTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueCardListTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IssueCardListTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
