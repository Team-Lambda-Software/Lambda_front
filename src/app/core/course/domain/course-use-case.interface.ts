import { Observable } from "rxjs";
import { Course, FullCourse } from "./course.model";

export interface ICourseUseCase {
	getPopularCourses(): Observable<Course[]>;
  searchCourse(valueToSearch: string): Observable<Course[]>;
  getById(id: string): Observable<FullCourse>;
}