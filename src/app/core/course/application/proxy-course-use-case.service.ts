import { Observable, shareReplay } from 'rxjs';
import { Course, PartialCourse } from '../domain/course.model';
import { ICourseUseCase } from '../domain/interfaces/course-use-case.interface';

export class ProxyCourseUseCase implements ICourseUseCase {
    private _popularCourses: Observable<PartialCourse[]> | null = null;
    private _selectedCourse: Map<string, Observable<Course>> = new Map();

    constructor(private _courseUseCaseService: ICourseUseCase) { }

    getCoursesByParams(params: string): Observable<PartialCourse[]> {
        return this._courseUseCaseService.getCoursesByParams(params);
    }

    getPopularCourses(): Observable<PartialCourse[]> {
        if (!this._popularCourses) {
            this._popularCourses = this._courseUseCaseService.getPopularCourses().pipe(
                shareReplay(1)
            );
        }
        console.log('ProxyCourseUseCase: fetching popular courses');
        return this._popularCourses;
    }

    searchCourse(valueToSearch: string): Observable<Course[]> {
        return this._courseUseCaseService.searchCourse(valueToSearch);
    }

    getById(id: string): Observable<Course> {
        if (!this._selectedCourse.has(id)) {
            console.log('ProxyCourseUseCase: fetching course by id in the real service');
            this._selectedCourse.set(id, this._courseUseCaseService.getById(id));
        }
        return this._selectedCourse.get(id) as Observable<Course>;
    }
}