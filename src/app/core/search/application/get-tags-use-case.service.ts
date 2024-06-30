import { Observable } from "rxjs";
import { ISearchApiService } from "../domain/interfaces/search-api.interface";
import { Result } from "../../../common/helpers/Result";
import { ITag } from "../domain/tags-model";
import { IGetTagsUseCase } from "../domain/interfaces/search-use-case.interface";

export class GetTagsUseCaseService implements IGetTagsUseCase {
    constructor(private _searchApiService: ISearchApiService) {}
    
    execute(params: string): Observable<Result<ITag[]>>{
        return this._searchApiService.getTags(params);
    }
}
