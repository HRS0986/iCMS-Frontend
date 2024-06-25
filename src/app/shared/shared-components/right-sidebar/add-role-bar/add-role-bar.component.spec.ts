import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleBarComponent } from './add-role-bar.component';

describe('AddRoleBarComponent', () => {
  let component: AddRoleBarComponent;
  let fixture: ComponentFixture<AddRoleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRoleBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRoleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
