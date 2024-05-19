import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, FullCourse } from '../domain/course.model';
import { ICourseApiService } from '../infrastructure/interfaces/course-api.interface';
import { HTTP_COURSE_SERVICE } from '../infrastructure/providers/course-api-provider';
import { ICourseUseCase } from '../domain/course-use-case.interface';

@Injectable({ providedIn: 'root' })
export class CourseUseCaseService implements ICourseUseCase {
	constructor(@Inject(HTTP_COURSE_SERVICE) private _courseApiService: ICourseApiService) {}

	getPopularCourses(): Observable<Course[]> {
		return this._courseApiService.getPopularCourses();
	}

  searchCourse(valueToSearch: string): Observable<Course[]> {
    return this._courseApiService.searchCourse(valueToSearch);
  }

  getById(id: string): Observable<FullCourse> {
    return this._courseApiService.getById(id);
  }
}