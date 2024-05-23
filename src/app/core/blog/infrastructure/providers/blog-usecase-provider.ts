import { Inject, Injectable } from "@angular/core";
import { BlogUseCaseService } from "../../application/blog-use-case.service";
import { HTTP_BLOG_SERVICE } from "./blog-api-provider";
import { IBlogApiService } from "../../domain/interfaces/blog-api-service.interface";

@Injectable({ providedIn: "root" })
export class BlogUsecaseProvider {
  public usecase: BlogUseCaseService;

  constructor(
    @Inject(HTTP_BLOG_SERVICE) private _blogApiService: IBlogApiService
  ) {
    this.usecase = new BlogUseCaseService(this._blogApiService);
  }
}