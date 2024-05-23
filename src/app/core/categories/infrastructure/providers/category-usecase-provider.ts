import { Inject, Injectable } from "@angular/core";
import { CategoryUseCaseService } from "../../application/category-use-case.service";
import { HTTP_CATEGORY_SERVICE } from "./category-api-provider";
import { ICategoryApiService } from "../../domain/interfaces/category-api.interface";

@Injectable({ providedIn: "root" })
export class CategoyUsecaseProvider {
  public usecase: CategoryUseCaseService;

  constructor(
    @Inject(HTTP_CATEGORY_SERVICE) private _categoryApiService: ICategoryApiService
  ) {
    this.usecase = new CategoryUseCaseService(this._categoryApiService);
  }
}