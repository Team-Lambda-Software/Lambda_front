import { Inject, Injectable } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { HTTP_SEARCH_SERVICE } from "./search-api-provider";
import { SearchUseCaseService } from "../../application/search-use-case.service";

@Injectable({ providedIn: "root" })
export class SearchUsecaseProvider {
    public usecase: SearchUseCaseService;

    constructor(
        @Inject(HTTP_SEARCH_SERVICE) private _searchApiService: ISearchApiService
    ) {
        this.usecase = new SearchUseCaseService(this._searchApiService);
    }
}