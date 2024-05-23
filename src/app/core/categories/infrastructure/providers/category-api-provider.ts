import { InjectionToken, Provider } from '@angular/core';
import { ICategoryApiService } from '../../domain/interfaces/category-api.interface';
import { CategoryApiService } from '../services/category-api.service';

export const HTTP_CATEGORY_SERVICE = new InjectionToken<ICategoryApiService>('CategoryApiService');

export const CATEGORY_API_PROVIDER: Provider = { provide: HTTP_CATEGORY_SERVICE, useClass: CategoryApiService };