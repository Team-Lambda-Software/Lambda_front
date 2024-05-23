import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICategoryApiService } from '../../domain/interfaces/category-api.interface';
import { enviroment } from '../../../../../environments/environment';
import { Category } from '../../domain/category.model';
import { CategoryResponse } from '../adapters/dtos/category.dto';
import { CategoryResponseToCategory } from '../adapters/converters/CategoryResponseToCategory';

@Injectable()
export class CategoryApiService implements ICategoryApiService {
  private _httpClient = inject(HttpClient);
  private readonly BASE_URL = enviroment.baseUrl + '/category'

  getByParams(params?: string): Observable<Category[]> {
    return this._httpClient.get<CategoryResponse[]>(`${this.BASE_URL}/many${params ?? ''}`)
      .pipe(map( c => c.map(CategoryResponseToCategory)));
  }
}