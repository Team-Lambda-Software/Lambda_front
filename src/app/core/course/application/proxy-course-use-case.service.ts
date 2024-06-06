import { Observable } from 'rxjs';
import { Course, PartialCourse } from '../domain/course.model';
import { ICourseUseCase } from '../domain/interfaces/course-use-case.interface';

export class ProxyCourseUseCase implements ICourseUseCase {
    private _popularCourses: Observable<PartialCourse[]> | null = null;

    constructor(private _courseUseCaseService: ICourseUseCase) { }

    getCoursesByParams(params: string): Observable<PartialCourse[]> {
        return this._courseUseCaseService.getCoursesByParams(params);
    }

    getPopularCourses(): Observable<PartialCourse[]> {
        if (!this._popularCourses) {
            this._popularCourses = this._courseUseCaseService.getCoursesByParams('?filter=POPULAR&perPage=5');
        }
        return this._popularCourses;
    }

    searchCourse(valueToSearch: string): Observable<Course[]> {
        return this._courseUseCaseService.searchCourse(valueToSearch);
    }

    getById(id: string): Observable<Course> {
        return this._courseUseCaseService.getById(id);
    }
}