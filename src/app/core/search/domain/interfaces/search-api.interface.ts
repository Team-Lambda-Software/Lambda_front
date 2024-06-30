import { Observable } from "rxjs";
import { SearchModel } from "../search-model";
import { Result } from "../../../../common/helpers/Result";
import { ITag } from "../tags-model";

export interface ISearchApiService {
    getBySearch(terms?: string, tags?: string[]): Observable<SearchModel>;
    
    getTags(params?: string): Observable<Result<ITag[]>>;
}