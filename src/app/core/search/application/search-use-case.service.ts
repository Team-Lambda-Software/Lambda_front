import { Observable } from "rxjs";
import { ISearchApiService } from "../domain/interfaces/search-api.interface";
import { SearchModel } from "../domain/search-model";
import { ISearchUseCase } from "../domain/interfaces/search-use-case.interface";
import { Optional } from "../../../shared/helpers/Optional";

export class SearchUseCaseService implements ISearchUseCase{
    constructor(private _searchApiService: ISearchApiService) {}
    
    getBySearch(terms?: string): Either<Observable<SearchModel>, Error>{
        if (!terms) {
            return Either.makeRight(new Error('No search terms provided'));
        }
        return Either.makeLeft(this._searchApiService.getBySearch(terms));
    }
}