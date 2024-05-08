import { TestBed } from '@angular/core/testing';
import { CoursesPopularService } from './courses-popular.service';


describe('CoursesPopular', () => {
  let service: CoursesPopularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoursesPopularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
