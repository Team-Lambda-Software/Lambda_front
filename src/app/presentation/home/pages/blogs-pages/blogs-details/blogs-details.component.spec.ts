import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsDetailsComponent } from './blogs-details.component';

describe('BlogsDetailsComponent', () => {
  let component: BlogsDetailsComponent;
  let fixture: ComponentFixture<BlogsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
