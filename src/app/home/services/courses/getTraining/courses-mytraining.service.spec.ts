import { TestBed } from '@angular/core/testing';

import { CoursesMyTrainingService } from './courses-mytraining.service';

describe('CoursesMytrainingService', () => {
  let service: CoursesMyTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesMyTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
