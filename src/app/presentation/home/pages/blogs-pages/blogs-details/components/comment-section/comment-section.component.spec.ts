import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectionComponent } from './comment-section.component';

describe('CommentSectionComponent', () => {
  let component: CommentSectionComponent;
  let fixture: ComponentFixture<CommentSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
