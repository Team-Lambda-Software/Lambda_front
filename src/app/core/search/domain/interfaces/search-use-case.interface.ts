import { Observable } from "rxjs";
import { SearchModel } from "../search-model";
import { Result } from "../../../../common/helpers/Result"
import { ITag } from "../tags-model";

export interface ISearchUseCase {
    getBySearch(terms?: string, tags?: string[]): Result<Observable<SearchModel>>;
}

export interface IGetTagsUseCase {
    execute(params: string): Observable<Result<ITag[]>>;
}


