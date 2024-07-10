import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerCoursesComponent } from './trainer-courses.component';

describe('TrainerCoursesComponent', () => {
  let component: TrainerCoursesComponent;
  let fixture: ComponentFixture<TrainerCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainerCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
