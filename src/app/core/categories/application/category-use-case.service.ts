import { Observable } from 'rxjs';
import { ICategoryApiService } from '../domain/interfaces/category-api.interface';
import { ICategoryUseCase } from '../domain/interfaces/category-use-case.interface';
import { Category } from '../domain/category.model';

export class CategoryUseCaseService implements ICategoryUseCase {
	constructor(private _categoryApiService: ICategoryApiService) {}
  
  getByParams(params?: string): Observable<Category[]> {
    return this._categoryApiService.getByParams(params);
  }

}