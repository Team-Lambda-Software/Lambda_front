import { InjectionToken, Provider } from '@angular/core';
import { IBlogApiService } from '../../domain/interfaces/blog-api-service.interface';
import { BlogApiService } from '../services/blog-api.service';

export const HTTP_BLOG_SERVICE = new InjectionToken<IBlogApiService>('BlogApiService');

export const BLOG_API_PROVIDER: Provider = { provide: HTTP_BLOG_SERVICE, useClass: BlogApiService };