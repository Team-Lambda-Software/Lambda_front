import { Observable } from "rxjs";
import { SearchModel } from "../search-model";
import { Result } from "../../../../common/helpers/Result"

export interface ISearchUseCase {
    getBySearch(terms?: string, tags?: string[]): Result<Observable<SearchModel>>;
}
