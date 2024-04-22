import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberBarComponent } from './add-member-bar.component';

describe('AddMemberBarComponent', () => {
  let component: AddMemberBarComponent;
  let fixture: ComponentFixture<AddMemberBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMemberBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMemberBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
