import { Observable } from "rxjs";
import { SearchModel } from "../search-model";

export interface ISearchApiService {
    getBySearch(terms?: string): Observable<SearchModel>;
}