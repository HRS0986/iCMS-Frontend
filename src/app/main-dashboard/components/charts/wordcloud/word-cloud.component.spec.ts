import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordcloudComponent } from './word-cloud.component';

describe('WordcloudComponent', () => {
  let component: WordcloudComponent;
  let fixture: ComponentFixture<WordcloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordcloudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
