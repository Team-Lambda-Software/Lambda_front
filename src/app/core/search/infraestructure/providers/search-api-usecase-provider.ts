import { Inject, Injectable } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { HTTP_SEARCH_SERVICE } from "./search-api-provider";
import { SearchUseCaseService } from "../../application/search-use-case.service";
import { ISearchUseCase } from "../../domain/interfaces/search-use-case.interface";

@Injectable({ providedIn: "root" })
export class SearchUseCaseProvider {
    public usecase: ISearchUseCase;

    constructor(
        @Inject(HTTP_SEARCH_SERVICE) private _searchApiService: ISearchApiService
    ) {
        this.usecase = new SearchUseCaseService(this._searchApiService);

        // ? Por ahora no voy a usar el proxy porque voy a probar los tags
        // this.usecase = new ProxySearchUseCase(new SearchUseCaseService(this._searchApiService));
    }
}

