import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareSkeletonComponent } from './square-skeleton.component';

describe('SquareSkeletonComponent', () => {
  let component: SquareSkeletonComponent;
  let fixture: ComponentFixture<SquareSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquareSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
