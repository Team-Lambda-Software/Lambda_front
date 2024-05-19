import { Observable } from 'rxjs';
import { Course, FullCourse } from '../../domain/course.model';

export interface ICourseApiService {
	getPopularCourses(): Observable<Course[]>;
  searchCourse(valueToSearch: string): Observable<Course[]>
  getById(id: string): Observable<FullCourse>;
}
