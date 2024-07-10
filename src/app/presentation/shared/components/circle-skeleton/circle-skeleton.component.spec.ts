import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleSkeletonComponent } from './circle-skeleton.component';

describe('CircleSkeletonComponent', () => {
  let component: CircleSkeletonComponent;
  let fixture: ComponentFixture<CircleSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircleSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
