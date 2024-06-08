import { Observable, of, tap } from 'rxjs';
import { Course, PartialCourse } from '../domain/course.model';
import { ICourseUseCase } from '../domain/interfaces/course-use-case.interface';

export class ProxyCourseUseCase implements ICourseUseCase {
  private cacheProxy = {
    coursesByParamsMap: new Map<string, Observable<PartialCourse[]>>(),
    searchCoursesMap: new Map<string, Observable<Course[]>>(),
    getByIdMap: new Map<string, Observable<Course>>(),
  }

  constructor(private _courseUseCaseService: ICourseUseCase) { }

  getCoursesByParams(params: string): Observable<PartialCourse[]> {
    if ( this.cacheProxy.coursesByParamsMap.has(params) ) return this.cacheProxy.coursesByParamsMap.get(params)!
    else return this._courseUseCaseService.getCoursesByParams(params)
                  .pipe(tap(c => {
                    this.cacheProxy.coursesByParamsMap.set(params, of(c))
                  }));

  }

  searchCourse(valueToSearch: string): Observable<Course[]> {
    if ( this.cacheProxy.searchCoursesMap.has(valueToSearch) ) return this.cacheProxy.searchCoursesMap.get(valueToSearch)!
    else return this._courseUseCaseService.searchCourse(valueToSearch)
                  .pipe(tap(c => {
                    this.cacheProxy.searchCoursesMap.set(valueToSearch, of(c))
                  }));
  }

  getById(id: string): Observable<Course> {
    if ( this.cacheProxy.getByIdMap.has(id) ) return this.cacheProxy.getByIdMap.get(id)!
    else return this._courseUseCaseService.getById(id)
                  .pipe(tap(c => {
                    this.cacheProxy.getByIdMap.set(id, of(c))
                  }));
  }
}