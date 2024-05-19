import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourseApiService } from '../interfaces/course-api.interface';
import { Course, FullCourse } from '../../domain/course.model';
import { enviroment } from '../../../../../environments/environment';

@Injectable()
export class CourseApiService implements ICourseApiService {
  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/course'
  
  getPopularCourses(): Observable<Course[]> {
    return this._httpClient.get<Course[]>(`${this.BASE_URL}/search/PopularCourses`);
  }
  searchCourse(valueToSearch: string): Observable<Course[]> {
    return this._httpClient.post<Course[]>(`${this.BASE_URL}/search`, {name: valueToSearch});
  }
  getById(id: string): Observable<FullCourse> {
    return this._httpClient.get<FullCourse>(`${this.BASE_URL}/${id}`);
  }

	
}