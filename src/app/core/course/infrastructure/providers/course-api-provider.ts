import { InjectionToken, Provider } from '@angular/core';
import { ICourseApiService } from '../interfaces/course-api.interface';
import { CourseApiService } from '../services/course-api.service';

export const HTTP_COURSE_SERVICE = new InjectionToken<ICourseApiService>('CourseApiService');

export const COURSE_API_PROVIDER: Provider = { provide: HTTP_COURSE_SERVICE, useClass: CourseApiService };