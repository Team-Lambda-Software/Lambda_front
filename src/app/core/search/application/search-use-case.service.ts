import { Observable } from "rxjs";
import { ISearchApiService } from "../domain/interfaces/search-api.interface";
import { SearchModel } from "../domain/search-model";
import { ISearchUseCase } from "../domain/interfaces/search-use-case.interface";
import { Result } from "../../helpers/Result";
import { Optional } from "../../../shared/helpers/Optional";

export class SearchUseCaseService implements ISearchUseCase{
    constructor(private _searchApiService: ISearchApiService) {}
    
    getBySearch(terms?: string): Result<Observable<SearchModel>>{
        if (!terms) {
            return Result.makeError(new Error('No search terms provided'));
        }
        return Result.makeResult(this._searchApiService.getBySearch(terms));
    }
}