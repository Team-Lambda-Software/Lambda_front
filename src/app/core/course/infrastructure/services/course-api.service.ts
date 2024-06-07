import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICourseApiService } from '../../domain/interfaces/course-api.interface';
import { Course, PartialCourse } from '../../domain/course.model';
import { enviroment } from '../../../../../environments/environment';
import { convertCourseResponseToCourse } from '../adapters/converters/CourseResponseToCourse';
import { CourseResponse, PartialCourseResponse } from '../adapters/dtos/courses.dto';

@Injectable()
export class CourseApiService implements ICourseApiService {
  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/course'

  getCoursesByParams(params: string): Observable<PartialCourse[]> {
    return this._httpClient.get<PartialCourseResponse[]>(`${this.BASE_URL}/many${params}`);
  }  
  searchCourse(valueToSearch: string): Observable<Course[]> {
    return this._httpClient.post<Course[]>(`${this.BASE_URL}/search`, {name: valueToSearch});
  }
  getById(id: string): Observable<Course> {
    return this._httpClient.get<CourseResponse>(`${this.BASE_URL}/one/${id}`).pipe(map(convertCourseResponseToCourse));
  }	
}