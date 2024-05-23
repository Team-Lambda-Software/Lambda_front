import { Observable } from 'rxjs';
import { Course, PartialCourse } from '../course.model';

export interface ICourseApiService {
	getCoursesByParams(params: string): Observable<PartialCourse[]>;
  searchCourse(valueToSearch: string): Observable<Course[]>
  getById(id: string): Observable<Course>;
}
