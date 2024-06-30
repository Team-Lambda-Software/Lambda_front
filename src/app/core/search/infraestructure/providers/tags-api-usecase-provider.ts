import { Inject, Injectable } from "@angular/core";
import { ISearchApiService } from "../../domain/interfaces/search-api.interface";
import { IGetTagsUseCase } from "../../domain/interfaces/search-use-case.interface";
import { GetTagsUseCaseService } from "../../application/get-tags-use-case.service";
import { HTTP_TAGS_SERVICE } from "./tags-api-provider";

@Injectable({ providedIn: "root" })

export class TagsApiUseCaseProvider {
    public usecase: IGetTagsUseCase;

    constructor(
        @Inject(HTTP_TAGS_SERVICE) private _searchApiService: ISearchApiService
    ) {
        this.usecase = new GetTagsUseCaseService(this._searchApiService);

        // ? Por ahora no voy a usar el proxy porque voy a probar los tags
        // this.usecase = new ProxySearchUseCase(new SearchUseCaseService(this._searchApiService));
    }
}

