import { Observable, of, tap } from 'rxjs';
import { Category } from '../domain/category.model';
import { ICategoryUseCase } from '../domain/interfaces/category-use-case.interface';

export class ProxyCategoryUseCase implements ICategoryUseCase {
  
  private cacheProxy = {
    getByParams: new Map<string, Observable<Category[]>>(),
  }

  constructor(private _courseUseCaseService: ICategoryUseCase) { }

  getByParams(params?: string | undefined): Observable<Category[]> {
    if ( this.cacheProxy.getByParams.has(params ?? 'noParamsProvided') ) return this.cacheProxy.getByParams.get(params ?? 'noParamsProvided')!
    else return this._courseUseCaseService.getByParams(params)
                  .pipe(tap(c => {
                    this.cacheProxy.getByParams.set(params ?? 'noParamsProvided', of(c))
                  }));
  }
}