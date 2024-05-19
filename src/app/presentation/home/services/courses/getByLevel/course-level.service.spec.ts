import { TestBed } from '@angular/core/testing';

import { CourseLevelService } from './course-level.service';

describe('CourseLevelService', () => {
  let service: CourseLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
