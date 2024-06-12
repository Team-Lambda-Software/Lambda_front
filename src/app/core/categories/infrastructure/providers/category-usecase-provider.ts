import { Inject, Injectable } from "@angular/core";
import { CategoryUseCaseService } from "../../application/category-use-case.service";
import { HTTP_CATEGORY_SERVICE } from "./category-api-provider";
import { ICategoryApiService } from "../../domain/interfaces/category-api.interface";
import { ProxyCategoryUseCase } from "../../application/proxy-category-use-case.service";
import { ICategoryUseCase } from "../../domain/interfaces/category-use-case.interface";

@Injectable({ providedIn: "root" })
export class CategoyUseCaseProvider {
  public usecase: ICategoryUseCase;

  constructor(
    @Inject(HTTP_CATEGORY_SERVICE) private _categoryApiService: ICategoryApiService
  ) {
    this.usecase = new ProxyCategoryUseCase(new CategoryUseCaseService(this._categoryApiService))
  }
}