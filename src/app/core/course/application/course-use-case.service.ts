import { Observable } from 'rxjs';
import { Course, PartialCourse } from '../domain/course.model';
import { ICourseApiService } from '../domain/interfaces/course-api.interface';
import { ICourseUseCase } from '../domain/interfaces/course-use-case.interface';

export class CourseUseCaseService implements ICourseUseCase {
	constructor(private _courseApiService: ICourseApiService) {}

	getCoursesByParams(params: string): Observable<PartialCourse[]> {
		return this._courseApiService.getCoursesByParams(params);
	}

  searchCourse(valueToSearch: string): Observable<Course[]> {
    return this._courseApiService.searchCourse(valueToSearch);
  }

  getById(id: string): Observable<Course> {
    return this._courseApiService.getById(id);
  }
}