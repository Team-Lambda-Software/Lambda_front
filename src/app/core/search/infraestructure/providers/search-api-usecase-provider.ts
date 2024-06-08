import { Inject, Injectable } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { HTTP_SEARCH_SERVICE } from "./search-api-provider";
import { SearchUseCaseService } from "../../application/search-use-case.service";
import { ProxySearchUseCase } from "../../application/proxy-search-use-case.service";
import { ISearchUseCase } from "../../domain/interfaces/search-use-case.interface";

@Injectable({ providedIn: "root" })
export class SearchUsecaseProvider {
    public usecase: ISearchUseCase;

    constructor(
        @Inject(HTTP_SEARCH_SERVICE) private _searchApiService: ISearchApiService
    ) {
        this.usecase = new ProxySearchUseCase(new SearchUseCaseService(this._searchApiService));
    }
}