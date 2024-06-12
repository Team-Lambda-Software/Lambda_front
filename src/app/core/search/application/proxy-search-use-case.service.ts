import { Observable, of, tap } from 'rxjs';
import { SearchModel } from '../domain/search-model';
import { ISearchUseCase } from '../domain/interfaces/search-use-case.interface';
import { Result } from '../../../common/helpers/Result';

export class ProxySearchUseCase implements ISearchUseCase {

  private cacheProxy = {
    getBySearch: new Map<string, Result<Observable<SearchModel>>>(),
  }

  constructor(private _searchUseCaseService: ISearchUseCase) { }

  getBySearch(terms: string | undefined): Result<Observable<SearchModel>> {
    if ( this.cacheProxy.getBySearch.has(terms ?? '*') ) return this.cacheProxy.getBySearch.get(terms ?? '*')!
    else if (!this._searchUseCaseService.getBySearch(terms).isError())
      return Result.makeResult(this._searchUseCaseService.getBySearch(terms).getValue()
              .pipe(tap(c => {
                this.cacheProxy.getBySearch.set(terms ?? '*', Result.makeResult<Observable<SearchModel>>(of(c)))
              })))
    else return this._searchUseCaseService.getBySearch(terms);
  }
}
